import { NextRequest, NextResponse } from "next/server";
import { dataStore } from "@/lib/db/data-store";
import { getPayUConfig, verifyPayUResponseHash, PayUCallbackParams } from "@/lib/payu";

/**
 * PayU Server-to-Server IPN (Instant Payment Notification) Webhook
 * Handles asynchronous payment confirmations, delayed UPI intent settlements, and refunds.
 */
export async function POST(req: NextRequest) {
  try {
    let params: Record<string, string> = {};

    const contentType = req.headers.get("content-type") || "";
    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        params[key] = value.toString();
      });
    } else {
      params = await req.json();
    }

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
    const orderId = callbackParams.udf1 || "";

    // Verify reverse hash if salt configured
    if (config.salt && config.salt !== "LIVE_PAYU_SALT") {
      const isHashValid = verifyPayUResponseHash(callbackParams, config.salt);
      if (!isHashValid) {
        console.error("PayU Webhook Alert: Invalid hash received for txnid:", callbackParams.txnid);
        return NextResponse.json({ error: "Invalid hash verification" }, { status: 400 });
      }
    }

    if (orderId) {
      const isSuccess = callbackParams.status.toLowerCase() === "success";
      dataStore.updateOrderPaymentDetails(orderId, {
        status: isSuccess ? "CONFIRMED" : "PLACED",
        paymentStatus: isSuccess ? "PAID" : "FAILED",
        payuStatus: callbackParams.status,
        payuTxnId: callbackParams.txnid,
        payuMihpayid: callbackParams.mihpayid,
      });
    }

    return NextResponse.json({ status: "acknowledged", received: true });
  } catch (error: any) {
    console.error("PayU webhook error:", error);
    return NextResponse.json(
      { error: error?.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}

