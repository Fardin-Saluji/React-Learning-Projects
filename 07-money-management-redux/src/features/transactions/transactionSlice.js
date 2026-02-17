import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const saveTransactionAsync = createAsyncThunk(
  "transactions/saveTransactionAsync",
  async (transaction) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return transaction;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    balance: 0,
    history: [],
    status: "idle",
  },
  reducers: {
    credit: (state, action) => {
      state.balance += action.payload.amount;
      state.history.push(action.payload);
    },
    debit: (state, action) => {
      state.balance -= action.payload.amount;
      state.history.push(action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveTransactionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveTransactionAsync.fulfilled, (state) => {
        state.status = "success";
      });
  },
  
});


export const { credit, debit } = transactionSlice.actions;
export default transactionSlice.reducer;
