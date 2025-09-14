import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  bookings: {},
};
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking: (state, action) => {
      state.bookings = action.payload;
    },
    removeBooking: (state, action) => {
      delete state.bookings[action.payload];
    },
    clearBookings: (state) => {
      state.bookings = {};
    },
  },
});

export default bookingSlice.reducer;
export const { addBooking, removeBooking, clearBookings } =
  bookingSlice.actions;
