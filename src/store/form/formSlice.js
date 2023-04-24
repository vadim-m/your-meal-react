import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { closeModal } from "../modalDelivery/modalDeliverySlice";
import { clearOrder } from "../order/orderSlice";

const initialState = {
  name: "",
  phone: "",
  format: "delivery",
  address: "",
  floor: "",
  intercom: "",
  error: null,
  errors: {},
  touch: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormValue: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setError: (state, action) => {
      state.errors = action.payload;
    },
    clearError: (state) => {
      state.errors = {};
    },
    changeTouch: (state) => {
      state.touch = true;
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
        "https://webvm-api-your-meal-order.glitch.me/api/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error(`Ошибка ${res.statusText}!`);
      }

      dispatch(clearOrder());
      dispatch(closeModal());

      return await res.json();
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const validateForm = () => (dispatch, getState) => {
  const form = getState().form;
  const errors = {};

  if (!form.name) {
    errors.name = "name is required!";
  }

  if (!form.phone) {
    errors.phone = "phone is required!";
  }

  if (!form.address && form.format === "delivery") {
    errors.address = "address is required!";
  }

  if (!form.floor && form.format === "delivery") {
    errors.floor = "floor is required!";
  }

  if (!form.intercom && form.format === "delivery") {
    errors.intercom = "intercom is required!";
  }

  if (form.format === "pickup") {
    dispatch(updateFormValue({ field: "address", value: "" }));
    dispatch(updateFormValue({ field: "floor", value: "" }));
    dispatch(updateFormValue({ field: "intercom", value: "" }));
  }

  if (Object.keys.length) {
    dispatch(setError(errors));
  } else {
    dispatch(clearError());
  }
};

export const { updateFormValue, setError, clearError, changeTouch } =
  formSlice.actions;
export default formSlice.reducer;
