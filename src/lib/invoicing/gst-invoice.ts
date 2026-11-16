import { Order, GSTInvoice, GSTTaxBreakdown } from "@/types";

const SELLER_STATE = "Uttar Pradesh";
const SELLER_STATE_CODE = "09";

export function generateGSTInvoice(order: Order): GSTInvoice {
  const isInterState =
    order.shippingAddress.state.trim().toLowerCase() !== SELLER_STATE.toLowerCase();

  const invoiceNumber = `SVO-INV-${order.orderNumber.replace(/[^a-zA-Z0-9]/g, "")}`;
  const invoiceDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate items with GST
  const items = order.items.map((item) => {
    // 18% inclusive GST standard for cosmetic herbal preparations
    const taxRate = 18;
    const grossTotal = item.total || item.price * item.quantity;
    const taxableAmount = Math.round((grossTotal / (1 + taxRate / 100)) * 100) / 100;
    const taxAmount = Math.round((grossTotal - taxableAmount) * 100) / 100;

    const cgst = isInterState ? 0 : Math.round((taxAmount / 2) * 100) / 100;
    const sgst = isInterState ? 0 : Math.round((taxAmount / 2) * 100) / 100;
    const igst = isInterState ? taxAmount : 0;

    return {
      description: item.productName + (item.variantTitle ? ` (${item.variantTitle})` : ""),
      hsnCode: "33059011", // Ayurvedic & Herbal cosmetics HSN
      quantity: item.quantity,
      unitPrice: item.price,
      discount: 0,
      taxableAmount,
      taxRate,
      cgst,
      sgst,
      igst,
      total: grossTotal,
    };
  });

  const totalTaxable = items.reduce((sum, i) => sum + i.taxableAmount, 0);
  const totalCGST = items.reduce((sum, i) => sum + i.cgst, 0);
  const totalSGST = items.reduce((sum, i) => sum + i.sgst, 0);
  const totalIGST = items.reduce((sum, i) => sum + i.igst, 0);
  const totalTax = Math.round((totalCGST + totalSGST + totalIGST) * 100) / 100;

  const taxSummary: GSTTaxBreakdown[] = [
    {
      taxableAmount: totalTaxable,
      hsnCode: "33059011",
      rate: 18,
      cgst: totalCGST,
      sgst: totalSGST,
      igst: totalIGST,
      totalTax,
    },
  ];

  return {
    invoiceNumber,
    invoiceDate,
    orderNumber: order.orderNumber,
    sellerDetails: {
      legalName: "Shree Vidhi Organics LLP",
      brandName: "Shree Vidhi Organics",
      gstin: "09AAECS9821F1ZX",
      fssaiLicense: "12724999000123",
      ayushLicense: "UP-AYU-VARANASI-2024/09",
      address: "N15/170 A Badi Gaibi Chauraha, Birdopur, Varanasi, Uttar Pradesh - 221010",
      state: SELLER_STATE,
      stateCode: SELLER_STATE_CODE,
      contactEmail: "shreevidhiorganics@gmail.com",
    },
    buyerDetails: {
      name: order.shippingAddress.fullName,
      phone: order.shippingAddress.phone,
      email: order.guestEmail,
      billingAddress: order.shippingAddress,
      shippingAddress: order.shippingAddress,
      state: order.shippingAddress.state,
    },
    items,
    taxSummary,
    subtotal: order.subtotal,
    totalDiscount: order.discount,
    shippingFee: order.shippingFee,
    totalTax,
    grandTotal: order.total,
    amountInWords: convertNumberToWords(order.total) + " Rupees Only",
    isInterState,
  };
}

function convertNumberToWords(amount: number): string {
  const words = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  if (amount === 0) return "Zero";
  if (amount < 20) return words[amount];
  if (amount < 100) return tens[Math.floor(amount / 10)] + (amount % 10 !== 0 ? " " + words[amount % 10] : "");
  if (amount < 1000)
    return words[Math.floor(amount / 100)] + " Hundred" + (amount % 100 !== 0 ? " and " + convertNumberToWords(amount % 100) : "");
  if (amount < 100000)
    return (
      convertNumberToWords(Math.floor(amount / 1000)) +
      " Thousand" +
      (amount % 1000 !== 0 ? " " + convertNumberToWords(amount % 1000) : "")
    );
  return amount.toString();
}
