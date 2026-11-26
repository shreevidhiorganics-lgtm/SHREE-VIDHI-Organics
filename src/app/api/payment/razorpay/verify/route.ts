import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getRazorpayConfig, verifyRazorpayPaymentSignature } from "@/lib/razorpay";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";
import { sendOrderConfirmationWhatsApp } from "@/lib/notifications/whatsapp";
import "@/lib/db/server-sync";

export async function POST(req: NextRequest) {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    if (!orderId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing Razorpay payment verification parameters." },
        { status: 400 }
      );
    }

    const config = getRazorpayConfig();
    if (!config.keySecret) {
      return NextResponse.json(
        { error: "Razorpay secret key is not configured." },
        { status: 500 }
      );
    }

    const isValid = verifyRazorpayPaymentSignature(
      { razorpay_order_id, razorpay_payment_id, razorpay_signature },
      config.keySecret
    );

    if (!isValid) {
      console.error("Razorpay Security Alert: Signature mismatch for order:", orderId);
      dataStore.updateOrderPaymentDetails(orderId, {
        paymentStatus: "FAILED",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpayStatus: "SIGNATURE_VERIFICATION_FAILED",
      });
      return NextResponse.json(
        { error: "Payment signature verification failed." },
        { status: 400 }
      );
    }

    const order = dataStore.getOrderById(orderId);
    dataStore.updateOrderPaymentDetails(orderId, {
      status: "CONFIRMED",
      paymentStatus: "PAID",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpayStatus: "CAPTURED",
    });

    if (order) {
      Promise.allSettled([
        sendOrderConfirmationSMS(order.shippingAddress.phone, order.orderNumber, order.total),
        sendOrderConfirmationEmail(order),
        sendOrderConfirmationWhatsApp(order),
      ]).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber: order?.orderNumber || orderId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });
  } catch (error: any) {
    console.error("Razorpay verify error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to verify Razorpay payment." },
      { status: 500 }
    );
  }
}
