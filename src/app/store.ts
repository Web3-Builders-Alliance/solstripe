import { configureStore } from "@reduxjs/toolkit";
import walletSlice from "./User/WalletStore";
import tokenDataSlice from "./User/TokenSlice";
export const store = configureStore({
  reducer: {
    wallet: walletSlice,
    tokenData: tokenDataSlice,
  },
});
export type AppDispatch = typeof store.dispatch;
