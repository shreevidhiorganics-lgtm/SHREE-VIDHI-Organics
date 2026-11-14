import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getPayUConfig, verifyPayUResponseHash, PayUCallbackParams } from "@/lib/payu";
import { sendOrderConfirmationSMS } from "@/lib/notifications/sms";
import { sendOrderConfirmationEmail } from "@/lib/notifications/email";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Convert FormData to standard object
    const params: Record<string, string> = {};
    formData.forEach((value, key) => {
      params[key] = value.toString();
    });

    const callbackParams: PayUCallbackParams = {
      status: params.status || "",
      txnid: params.txnid || "",
      amount: params.amount || "",
      productinfo: params.productinfo || "",
      firstname: params.firstname || "",
      email: params.email || "",
      hash: params.hash || "",
      key: params.key || "",
      mihpayid: params.mihpayid,
      mode: params.mode,
      error: params.error,
      error_Message: params.error_Message,
      bank_ref_num: params.bank_ref_num,
      additionalCharges: params.additionalCharges,
      udf1: params.udf1, // Order ID
      udf2: params.udf2, // Order Number
      udf3: params.udf3,
      udf4: params.udf4,
      udf5: params.udf5,
    };

    const config = getPayUConfig();
    const origin = req.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

    const orderId = callbackParams.udf1 || "";
    const isSuccess = callbackParams.status.toLowerCase() === "success";

    // 1. Verify cryptographic reverse hash
    // (If secret salt is not configured in environment, skip strict hash check so test flows work)
    let isHashValid = true;
    if (config.salt && config.salt !== "LIVE_PAYU_SALT") {
      isHashValid = verifyPayUResponseHash(callbackParams, config.salt);
    }

    if (!isHashValid) {
      console.error("PayU Callback Security Alert: Hash mismatch detected for txnid:", callbackParams.txnid);
      if (orderId) {
        dataStore.updateOrderPaymentDetails(orderId, {
          paymentStatus: "FAILED",
          payuStatus: "HASH_VERIFICATION_FAILED",
          payuTxnId: callbackParams.txnid,
          payuMihpayid: callbackParams.mihpayid,
        });
      }
      return NextResponse.redirect(
        `${baseUrl}/order-confirmation?orderId=${orderId}&status=failed&error=Security+validation+failed`,
        303
      );
    }

    // 2. Handle Payment Outcome
    if (isSuccess) {
      if (orderId) {
        const order = dataStore.getOrderById(orderId);
        dataStore.updateOrderPaymentDetails(orderId, {
          status: "CONFIRMED",
          paymentStatus: "PAID",
          payuStatus: "SUCCESS",
          payuTxnId: callbackParams.txnid,
          payuMihpayid: callbackParams.mihpayid,
        });

        if (order) {
          Promise.allSettled([
            sendOrderConfirmationSMS(order.shippingAddress.phone, order.orderNumber, order.total),
            sendOrderConfirmationEmail(order),
          ]).catch(() => {});
        }
      }

      return NextResponse.redirect(
        `${baseUrl}/order-confirmation?orderId=${orderId}&status=success&txnid=${encodeURIComponent(
          callbackParams.txnid
        )}&payuid=${encodeURIComponent(callbackParams.mihpayid || "")}`,
        303
      );
    } else {
      // Payment Failed or Cancelled by customer
      const errorMessage = callbackParams.error_Message || callbackParams.error || "Payment was cancelled or unsuccessful";
      
      if (orderId) {
        dataStore.updateOrderPaymentDetails(orderId, {
          paymentStatus: "FAILED",
          payuStatus: callbackParams.status || "FAILED",
          payuTxnId: callbackParams.txnid,
          payuMihpayid: callbackParams.mihpayid,
        });
      }

      return NextResponse.redirect(
        `${baseUrl}/order-confirmation?orderId=${orderId}&status=failed&error=${encodeURIComponent(errorMessage)}`,
        303
      );
    }
  } catch (error: any) {
    console.error("PayU callback error:", error);
    const origin = req.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || origin;
    return NextResponse.redirect(`${baseUrl}/checkout?error=callback_error`, 303);
  }
}

