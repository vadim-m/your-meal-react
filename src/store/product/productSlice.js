import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URI, POSTFIX } from "../../constants/const";

const initialState = {
  products: [],
  flagProduct: false,
  error: "",
};

export const productRequestAsync = createAsyncThunk(
  "product/fetch",
  (category) =>
    fetch(`${API_URI}${POSTFIX}?category=${category}`)
      .then((req) => req.json())
      .catch((error) => ({ error }))
);

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(productRequestAsync.pending.type, (state) => {
        state.error = "";
        state.flagProduct = false;
      })
      .addCase(productRequestAsync.rejected.type, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(productRequestAsync.fulfilled.type, (state, action) => {
        state.error = "";
        state.products = action.payload;
        state.flagProduct = true;
      });
  },
});

export default productSlice.reducer;
