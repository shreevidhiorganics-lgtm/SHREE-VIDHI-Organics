import crypto from "crypto";

export interface PayUConfig {
  key: string;
  salt: string;
  environment: "production" | "test";
  paymentUrl: string;
}

export function getPayUConfig(): PayUConfig {
  const key = process.env.PAYU_MERCHANT_KEY || "";
  const salt = process.env.PAYU_MERCHANT_SALT || "";
  const environment = (process.env.PAYU_ENV === "test" ? "test" : "production") as "production" | "test";
  
  // PayU Live (Production) vs Sandbox URL
  const paymentUrl = environment === "test"
    ? "https://test.payu.in/_payment"
    : "https://secure.payu.in/_payment";

  return { key, salt, environment, paymentUrl };
}

export interface PayUInitiateParams {
  key: string;
  txnid: string;
  amount: string; // Formatted with 2 decimals e.g. "1299.00"
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string;
  furl: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * Generates the SHA-512 hash required for PayU payment initiation.
 * Formula: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
 */
export function generatePayUHash(params: PayUInitiateParams, salt: string): string {
  const hashSequence = [
    params.key,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || "",
    params.udf2 || "",
    params.udf3 || "",
    params.udf4 || "",
    params.udf5 || "",
    "", "", "", "", "", // 5 empty pipes between udf5 and salt
    salt,
  ].join("|");

  return crypto.createHash("sha512").update(hashSequence).digest("hex");
}

export interface PayUCallbackParams {
  status: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  hash: string;
  key: string;
  mihpayid?: string;
  mode?: string;
  error?: string;
  error_Message?: string;
  bank_ref_num?: string;
  additionalCharges?: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
}

/**
 * Validates the reverse SHA-512 hash sent by PayU in return callback or webhook.
 * Formula:
 * If additionalCharges: sha512(additionalCharges|SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 * Else: sha512(SALT|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key)
 */
export function verifyPayUResponseHash(params: PayUCallbackParams, salt: string): boolean {
  if (!params.hash) return false;

  const reverseSequence = [
    params.udf5 || "",
    params.udf4 || "",
    params.udf3 || "",
    params.udf2 || "",
    params.udf1 || "",
    params.email,
    params.firstname,
    params.productinfo,
    params.amount,
    params.txnid,
    params.key,
  ].join("|");

  let hashSequence = "";
  if (params.additionalCharges) {
    hashSequence = `${params.additionalCharges}|${salt}|${params.status}||||||${reverseSequence}`;
  } else {
    hashSequence = `${salt}|${params.status}||||||${reverseSequence}`;
  }

  const expectedHash = crypto.createHash("sha512").update(hashSequence).digest("hex");
  return expectedHash.toLowerCase() === params.hash.toLowerCase();
}

