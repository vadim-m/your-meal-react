import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  phone: "",
  format: "delivery",
  address: "",
  floor: "",
  intercom: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitForm.pending, (state) => {
        state.status = "loading";
        state.responce = null;
        state.error = null;
      })
      .addCase(submitForm.fulfilled, (state, action) => {
        state.status = "success";
        state.responce = action.payload;
      })
      .addCase(submitForm.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const submitForm = createAsyncThunk(
  "form/submit",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://cloudy-slash-rubidium.glitch.me/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const { updateFormValue } = formSlice.actions;
export default formSlice.reducer;
