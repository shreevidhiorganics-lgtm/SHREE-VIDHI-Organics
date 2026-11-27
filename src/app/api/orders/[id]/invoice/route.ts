import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { generateGSTInvoice } from "@/lib/invoicing/gst-invoice";
import { formatPrice } from "@/lib/utils";
import { getCurrentUser } from "@/lib/auth/auth";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { ensureDatabaseHydrated } from "@/lib/db/server-sync";

export const dynamic = "force-dynamic";

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
    const ipLimit = checkRateLimit(`invoice_lookup:${clientIp}`, 20, 10 * 60 * 1000);
    if (!ipLimit.allowed) {
      return new NextResponse("Too many invoice requests. Please try again later.", { status: 429 });
    }

    await ensureDatabaseHydrated({ force: true });
    const orderId = params.id;
    let order = dataStore.getOrderById(orderId);

    if (!order) {
      order = dataStore.getOrderByNumber(orderId);
    }

    if (!order) {
      return new NextResponse("Order not found.", { status: 404 });
    }

    // OWASP A01: IDOR & Personal Data Protection on Tax Invoices
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const verifyPhone = (searchParams.get("phone") || "").replace(/\D/g, "").slice(-10);
    const orderPhone = (order.shippingAddress.phone || "").replace(/\D/g, "").slice(-10);

    const isOwner = Boolean(
      currentUser &&
        (currentUser.userId === order.userId ||
          (currentUser.email &&
            order.guestEmail &&
            currentUser.email.toLowerCase() === order.guestEmail.toLowerCase()))
    );
    const isAdmin = Boolean(
      currentUser &&
        currentUser.role === "ADMIN" &&
        currentUser.email?.toLowerCase().trim() === "shreevidhiorganics@gmail.com"
    );

    if (!isOwner && !isAdmin && verifyPhone) {
      const phoneProbeLimit = checkRateLimit(`invoice_phone:${order.id}:${clientIp}`, 5, 15 * 60 * 1000);
      if (!phoneProbeLimit.allowed) {
        return new NextResponse("Too many verification attempts. Please sign in to view your invoice.", { status: 429 });
      }
    }

    const isPhoneVerified = Boolean(
      verifyPhone.length === 10 && orderPhone.length === 10 && verifyPhone === orderPhone
    );

    // Block unauthorized third-party attempts to inspect any order invoice (registered or guest)
    if (!isOwner && !isAdmin && !isPhoneVerified) {
      return new NextResponse("Access restricted. Please sign in or verify your order mobile number.", { status: 403 });
    }

    const inv = generateGSTInvoice(order);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>GST Tax Invoice - ${inv.invoiceNumber}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 24px; color: #1c1917; font-size: 13px; line-height: 1.5; background: #fafaf9; }
    .invoice-card { max-width: 800px; margin: 0 auto; background: #fff; padding: 36px; border: 1px solid #e7e5e4; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header-row { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #166534; padding-bottom: 18px; margin-bottom: 20px; }
    .brand-title { font-size: 22px; font-weight: 800; color: #14532d; letter-spacing: 0.5px; margin: 0; }
    .brand-subtitle { font-size: 11px; text-transform: uppercase; color: #78716c; letter-spacing: 1px; font-weight: 600; }
    .inv-title { font-size: 18px; font-weight: 700; color: #1c1917; text-align: right; margin: 0; }
    .meta-box { display: flex; justify-content: space-between; margin-bottom: 24px; gap: 20px; }
    .meta-col { flex: 1; background: #f5f5f4; padding: 14px 18px; border-radius: 8px; }
    .meta-col h4 { margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #57534e; letter-spacing: 0.5px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
    th { background: #f5f5f4; color: #44403c; padding: 10px 12px; text-align: left; font-weight: 600; border-bottom: 1px solid #e7e5e4; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 12px; border-bottom: 1px solid #f5f5f4; }
    .text-right { text-align: right; }
    .summary-box { display: flex; justify-content: flex-end; margin-bottom: 20px; }
    .summary-table { width: 320px; }
    .summary-table td { padding: 6px 10px; }
    .grand-total { font-weight: 800; font-size: 15px; color: #14532d; background: #f0fdf4; border-top: 2px solid #166534; }
    .legal-footer { margin-top: 30px; padding-top: 18px; border-top: 1px dashed #d6d3d1; font-size: 11px; color: #78716c; text-align: center; }
    .print-bar { text-align: right; margin-bottom: 16px; max-width: 800px; margin: 0 auto 16px auto; }
    .btn-print { background: #15803d; color: #fff; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 12px; }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-card { border: none; box-shadow: none; padding: 0; }
      .print-bar { display: none; }
    }
  </style>
</head>
<body>
  <div class="print-bar">
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>

  <div class="invoice-card">
    <div class="header-row">
      <div>
        <h1 class="brand-title">SHREE VIDHI ORGANICS</h1>
        <div class="brand-subtitle">Varanasi Vedic Ayurvedic Formulation</div>
        <div style="font-size: 11px; color: #57534e; margin-top: 4px;">
          GSTIN: <strong>${escapeHtml(inv.sellerDetails.gstin)}</strong> | AYUSH: ${escapeHtml(inv.sellerDetails.ayushLicense)}<br>
          FSSAI Lic: ${escapeHtml(inv.sellerDetails.fssaiLicense)}<br>
          ${escapeHtml(inv.sellerDetails.address)}
        </div>
      </div>
      <div>
        <h2 class="inv-title">TAX INVOICE</h2>
        <div style="text-align: right; font-size: 11px; color: #57534e; margin-top: 4px;">
          Invoice No: <strong>${escapeHtml(inv.invoiceNumber)}</strong><br>
          Invoice Date: ${escapeHtml(inv.invoiceDate)}<br>
          Order No: <strong>${escapeHtml(inv.orderNumber)}</strong><br>
          State of Supply: ${inv.isInterState ? "Inter-State (IGST)" : "Intra-State (CGST+SGST)"}
        </div>
      </div>
    </div>

    <div class="meta-box">
      <div class="meta-col">
        <h4>Billed / Shipped To:</h4>
        <strong>${escapeHtml(inv.buyerDetails.name)}</strong><br>
        ${escapeHtml(inv.buyerDetails.shippingAddress.houseFlat)}, ${escapeHtml(inv.buyerDetails.shippingAddress.street)}<br>
        ${escapeHtml(inv.buyerDetails.shippingAddress.city)}, ${escapeHtml(inv.buyerDetails.shippingAddress.state)} - ${escapeHtml(inv.buyerDetails.shippingAddress.pinCode)}<br>
        Phone: ${escapeHtml(inv.buyerDetails.phone)}
      </div>
      <div class="meta-col">
        <h4>Tax Registration & Compliance:</h4>
        Place of Supply: <strong>${escapeHtml(inv.buyerDetails.state)}</strong><br>
        Reverse Charge: <strong>No</strong><br>
        Tax Category: <strong>18% GST on Herbal Preparations</strong><br>
        Payment Status: <strong>${escapeHtml(order.paymentStatus)} (${escapeHtml(order.paymentMethod)})</strong>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Description of Goods</th>
          <th>HSN</th>
          <th class="text-right">Qty</th>
          <th class="text-right">Unit Rate</th>
          <th class="text-right">Taxable Val</th>
          <th class="text-right">${inv.isInterState ? "IGST (18%)" : "CGST+SGST"}</th>
          <th class="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${inv.items
          .map(
            (it, i) => `
          <tr>
            <td>${i + 1}</td>
            <td><strong>${escapeHtml(it.description)}</strong></td>
            <td>${escapeHtml(it.hsnCode)}</td>
            <td class="text-right">${it.quantity}</td>
            <td class="text-right">${formatPrice(it.unitPrice)}</td>
            <td class="text-right">${formatPrice(it.taxableAmount)}</td>
            <td class="text-right">${formatPrice(it.cgst + it.sgst + it.igst)}</td>
            <td class="text-right"><strong>${formatPrice(it.total)}</strong></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>

    <div class="summary-box">
      <table class="summary-table">
        <tr>
          <td>Subtotal (Taxable):</td>
          <td class="text-right">${formatPrice(inv.taxSummary[0]?.taxableAmount || 0)}</td>
        </tr>
        ${
          inv.isInterState
            ? `<tr><td>Integrated GST (IGST 18%):</td><td class="text-right">${formatPrice(inv.totalTax)}</td></tr>`
            : `<tr><td>Central GST (CGST 9%):</td><td class="text-right">${formatPrice(inv.totalTax / 2)}</td></tr>
               <tr><td>State GST (SGST 9%):</td><td class="text-right">${formatPrice(inv.totalTax / 2)}</td></tr>`
        }
        ${
          inv.totalDiscount > 0
            ? `<tr><td>Discount Applied:</td><td class="text-right text-green-700">-${formatPrice(inv.totalDiscount)}</td></tr>`
            : ""
        }
        <tr>
          <td>Shipping & Handling:</td>
          <td class="text-right">${inv.shippingFee > 0 ? formatPrice(inv.shippingFee) : "FREE"}</td>
        </tr>
        <tr class="grand-total">
          <td>Grand Total:</td>
          <td class="text-right">${formatPrice(inv.grandTotal)}</td>
        </tr>
      </table>
    </div>

    <div style="font-size: 11px; margin-top: 10px;">
      <strong>Amount in Words:</strong> ${escapeHtml(inv.amountInWords)}
    </div>

    <div class="legal-footer">
      This is a computer-generated tax invoice issued in accordance with Section 31 of the CGST Act, 2017.<br>
      Certified that the particulars given above are true and correct. Handcrafted with traditional reverence in Varanasi, UP.
    </div>
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    });
  } catch {
    return new NextResponse("Invoice generation error.", { status: 500 });
  }
}
