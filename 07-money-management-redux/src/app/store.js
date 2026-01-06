import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "../features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
  },
});
