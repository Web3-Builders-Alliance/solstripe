// tokenDataSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBalanc = createAsyncThunk(
  "wallet/fetchBalance",
  async (publicKey: string) => {
    const response = await fetch(`https://api.com/balance/${publicKey}`);
    return response.json();
  }
);
export const tokenDataSlice = createSlice({
  name: "tokenData",
  initialState: {
    tokens: {},
    status: "idle",
  },
  reducers: {
    updateTokenData: (state, action) => {
      state.tokens = { ...state.tokens, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBalanc.pending, (state) => {
      state.status = "loading";
    });
  },
});

export const { updateTokenData } = tokenDataSlice.actions;
export default tokenDataSlice.reducer;
