// GET  all bookings
// POST booking
// GET  advancedTripInfo
// GET  getTotalBookingsAndRevenue
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ============ Thunks ============

// GET all bookings
export const getAllBookings = createAsyncThunk(
  "bookings/getAllBookings",
  async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);

// app/store/bookingSlice.js
export const postBooking = createAsyncThunk(
  "bookings/postBooking",
  async ({ url }, { getState, rejectWithValue }) => {
    try {
      const s = getState();
      const b = s.bookings || s.booking;

      const raw =
        b?.bookingDetails?.bookingDate || b?.bookingDetails?.date || "";
      const bookingDate = raw ? new Date(`${raw}T14:00:00.000Z`).toISOString() : undefined;

      // ✅ مطابق للاسكيما
      const payload = {
        tripInfo: String(b.tripId),
        adult: Math.max(1, Number(b?.bookingDetails?.adult ?? 1)),
        child: Math.max(0, Number(b?.bookingDetails?.child ?? 0)),
        totalPrice: {
          egp: Number(b?.bookingDetails?.totalPrice?.egp ?? 0),
          euro: Number(b?.bookingDetails?.totalPrice?.euro ?? 0),
        },
        transportation: Boolean(b?.bookingDetails?.transfer),
        user: {
          firstName: b?.userInfo?.firstName || "",
          lastName:  b?.userInfo?.lastName  || "",
          email:     b?.userInfo?.email     || "",
          phone:     b?.userInfo?.phone     || "",
          message:   b?.userInfo?.message   || "",
        },
        ...(bookingDate ? { bookingDate } : {}),
      };

      const res = await axios.post(url, payload, {
        headers: { "Content-Type": "application/json" },
        validateStatus: (st) => st >= 200 && st < 300, // بس 2xx تعتبر نجاح
      });

      // ✅ لو الباك بيرجع أي شكل (doc مباشرة / data / booking ...)
      const created =
        res.data?.data ??
        res.data?.booking ??
        res.data?.result ??
        res.data; // آخر حل: رجّع الرد كله

      return created;
    } catch (err) {
      const server = err.response?.data || err.message || "Unknown error";
      return rejectWithValue(server);
    }
  }
);

// GET advancedTripInfo
export const getAdvancedTripInfo = createAsyncThunk(
  "bookings/getAdvancedTripInfo",
  async (url, { rejectWithValue }) => {
    try {
      const res = await axios.get(url);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET getTotalBookingsAndRevenue
export const getTotalBookingsAndRevenue = createAsyncThunk(
  "bookings/getTotalBookingsAndRevenue",
  async (url, { rejectWithValue }) => {
    try {
      const res = await axios.get(url);
      return res.data.data; // { totalBookings, totalRevenue, ... }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ============ Initial State ============

const initialState = {
  // tripId: null,
  // trip: null, // store complete trip if you pass it
  // userInfo: {
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   phone: "",
  //   message: "",
  // },
  // bookingDetails: {
  //   adult: 1,
  //   child: 0,
  //   transfer: false,
  //   totalPrice: { egp: 0, euro: 0 },
  //   bookingDate: "",
  // },
  // // request mgmt
  // list: [],
  // advancedInfo: null,
  // totals: null,
  // loading: false,
  // error: null,
  // postLoading: false,
  // postError: null,
  // lastCreatedBooking: null,
};

// ============ Slice ============

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setTripId: (state, action) => {
      state.tripId = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
    setBookingDetails: (state, action) => {
      // Normalize date field and allow trip/tripId pass-through
      const { trip, tripId, date, bookingDate, ...rest } = action.payload || {};
      state.bookingDetails = {
        ...state.bookingDetails,
        ...rest,
        bookingDate: bookingDate ?? date ?? state.bookingDetails.bookingDate,
      };
      if (trip) state.trip = trip;
      if (tripId) state.tripId = tripId;
    },
    clearBookingState: (state) => {
      state.tripId = null;
      state.trip = null;
      state.userInfo = initialState.userInfo;
      state.bookingDetails = initialState.bookingDetails;
      state.lastCreatedBooking = null;
      state.postError = null;
      state.postLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET all bookings
      .addCase(getAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // POST booking
      .addCase(postBooking.pending, (state) => {
        state.postLoading = true;
        state.postError = null;
      })
      .addCase(postBooking.fulfilled, (state, action) => {
        state.postLoading = false;
        state.lastCreatedBooking = action.payload;
        state.list = Array.isArray(state.list)
          ? [action.payload, ...state.list]
          : [action.payload];
        // optional reset
        state.tripId = null;
        state.userInfo = initialState.userInfo;
        state.bookingDetails = initialState.bookingDetails;
      })
      .addCase(postBooking.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = action.payload || action.error.message;
      })

      // GET advancedTripInfo
      .addCase(getAdvancedTripInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdvancedTripInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.advancedInfo = action.payload;
      })
      .addCase(getAdvancedTripInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // GET totals
      .addCase(getTotalBookingsAndRevenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTotalBookingsAndRevenue.fulfilled, (state, action) => {
        state.loading = false;
        state.totals = action.payload;
      })
      .addCase(getTotalBookingsAndRevenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookingSlice.reducer;
export const { setTripId, setUserInfo, setBookingDetails, clearBookingState } =
  bookingSlice.actions;
