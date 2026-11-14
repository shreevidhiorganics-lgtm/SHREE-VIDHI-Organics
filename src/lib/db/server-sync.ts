import { dataStore } from "@/lib/db/data-store";
import {
  isMySQLConfigured,
  initMySQLTables,
  dbSaveOrder,
  dbSaveUser,
  dbSaveAddress,
  dbSaveOtp,
  dbSaveReview,
  dbUpdateProductStock,
} from "@/lib/db/mysql";

let isRegistered = false;

export function initServerDatabaseSync() {
  if (isRegistered || typeof window !== "undefined") return;
  isRegistered = true;

  if (isMySQLConfigured()) {
    // Initial schema verify/migration in background
    initMySQLTables().catch((err) => {
      console.error("[MySQL Sync] Error initializing tables:", err);
    });
  }

  // Hook into DataStore mutation events
  dataStore.onMutation(async (action, payload) => {
    if (!isMySQLConfigured()) return;

    try {
      if (action === "saveOrder" && payload) {
        await dbSaveOrder(payload);
      } else if (action === "saveUser" && payload) {
        await dbSaveUser(payload);
      } else if (action === "saveAddress" && payload) {
        await dbSaveAddress(payload);
      } else if (action === "saveOtp" && payload) {
        await dbSaveOtp(payload.phone, payload.otp, payload.expiresAt);
      } else if (action === "saveReview" && payload) {
        await dbSaveReview(payload);
      } else if (action === "updateStock" && payload) {
        await dbUpdateProductStock(payload.productId, payload.quantity);
      } else if (action === "initTables") {
        await initMySQLTables();
      }
    } catch (err) {
      console.error(`[MySQL Sync] Error on ${action}:`, err);
    }
  });
}

// Auto-execute on server module load
if (typeof window === "undefined") {
  initServerDatabaseSync();
}

