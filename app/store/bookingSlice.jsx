import { createSlice } from "@reduxjs/toolkit";

// Initial state to hold the trip info, user info, and booking details
const initialState = {
  tripId: null, // Store the trip ID when the user selects the trip
  userInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  },
  bookingDetails: {
    adult: 1,
    child: 0,
    transfer: false, // Whether the user has opted for transportation
    totalPrice: { egp: 0, euro: 0 },
    bookingDate:''
  },
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setTripId: (state, action) => {
      // Store the trip ID when the user selects a trip
      state.tripId = action.payload;
    },
    setUserInfo: (state, action) => {
      // Store the user info when the user fills out the form
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setBookingDetails: (state, action) => {
      // Store the booking details (adult, child, etc.)
      state.bookingDetails = { ...state.bookingDetails, ...action.payload };
    },
    clearBookingState: (state) => {
      // Clear the booking state if the user wants to reset or on checkout
      state.tripId = null;
      state.userInfo = initialState.userInfo;
      state.bookingDetails = initialState.bookingDetails;
    },
  },
});

export default bookingSlice.reducer;
export const { setTripId, setUserInfo, setBookingDetails, clearBookingState } = bookingSlice.actions;
