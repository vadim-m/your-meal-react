import { createSlice } from "@reduxjs/toolkit";

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
});

export const { updateFormValue } = formSlice.actions;
export default formSlice.reducer;
