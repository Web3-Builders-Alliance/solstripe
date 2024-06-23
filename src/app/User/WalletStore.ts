// walletSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Connection, PublicKey } from "@solana/web3.js";

export const fetchBalance = createAsyncThunk(
  "wallet/fetchBalance",
  async ({ publicKey }: { publicKey: string | undefined }) => {
    try {
      if (publicKey) {
        console.log("fetchign wallet balance");

        const connection = new Connection("https://api.devnet.solana.com");
        console.log("connection", connection);

        const balance = await connection.getBalance(new PublicKey(publicKey));
        console.log(balance / 1e9, "this is balace");

        return balance / 1e9;
      } // Convert lamports to SOL
      return null;
    } catch (error) {
      return null;
    }
  }
);

export const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    publicKey: null,
    balance: 0 as number | null,
    status: "idle",
    loading: false,
    error: " " as string | null,
  },
  reducers: {
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPublicKey } = walletSlice.actions;
export default walletSlice.reducer;
