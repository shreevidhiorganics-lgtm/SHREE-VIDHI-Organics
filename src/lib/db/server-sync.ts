import { dataStore } from "@/lib/db/data-store";
import {
  isMySQLConfigured,
  initMySQLTables,
  dbLoadAllState,
  dbSaveOrder,
  dbSaveUser,
  dbSaveAddress,
  dbSaveOtp,
  dbSaveReview,
  dbUpdateProductStock,
  dbSaveProduct,
  dbDeleteProduct,
  dbSaveCoupon,
  dbDeleteCoupon,
  dbUpdateReviewApproval,
  dbSaveSiteSettings,
} from "@/lib/db/mysql";

const g = globalThis as typeof globalThis & {
  __svoDbSyncRegistered?: boolean;
  __svoDbReadyPromise?: Promise<void>;
};

export function ensureDatabaseHydrated(): Promise<void> {
  initServerDatabaseSync();
  return g.__svoDbReadyPromise || Promise.resolve();
}

export function initServerDatabaseSync() {
  if (
    g.__svoDbSyncRegistered ||
    typeof window !== "undefined" ||
    process.env.NEXT_PHASE === "phase-production-build"
  ) {
    return;
  }
  g.__svoDbSyncRegistered = true;

  if (isMySQLConfigured()) {
    // Initialize tables and hydrate DataStore from MySQL on server startup
    g.__svoDbReadyPromise = initMySQLTables()
      .then(async (ok) => {
        if (!ok) return;
        const dbState = await dbLoadAllState();
        if (dbState) {
          dataStore.hydrateFromDatabase(dbState);
          console.log(
            `[MySQL Sync] Hydrated ${dbState.orders.length} orders, ${dbState.users.length} users, ${dbState.products.length} products.`
          );
        }
      })
      .catch((err) => {
        console.error("[MySQL Sync] Error initializing/hydrating tables:", err);
      });
  } else {
    g.__svoDbReadyPromise = Promise.resolve();
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
      } else if (action === "saveProduct" && payload) {
        await dbSaveProduct(payload);
      } else if (action === "deleteProduct" && payload) {
        await dbDeleteProduct(payload);
      } else if (action === "saveCoupon" && payload) {
        await dbSaveCoupon(payload);
      } else if (action === "deleteCoupon" && payload) {
        await dbDeleteCoupon(payload);
      } else if (action === "updateReviewApproval" && payload) {
        await dbUpdateReviewApproval(payload.reviewId, payload.isApproved);
      } else if (action === "saveSettings" && payload) {
        await dbSaveSiteSettings(payload);
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

