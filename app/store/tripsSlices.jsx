import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// استدعاء البيانات من الـ API
export const fetchTripsData = createAsyncThunk(
  'trips/fetchTripsData',
  async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data.data;  // نرجع البيانات تحت المفتاح "data"
  }
);

const initialState = {
  trips: [],  // سنخزن هنا الرحلات
  loading: false,  // حالة التحميل
  error: null,  // حالة الخطأ
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTripsData.pending, (state) => {
        state.loading = true;  // عندما يبدأ الطلب
      })
      .addCase(fetchTripsData.fulfilled, (state, action) => {
        state.loading = false;  // عندما يكتمل الطلب
        state.trips = action.payload;  // تخزين البيانات في الـ state
      })
      .addCase(fetchTripsData.rejected, (state, action) => {
        state.loading = false;  // إذا فشل الطلب
        state.error = action.error.message;  // تخزين الخطأ
      });
  },
});

export default tripsSlice.reducer;
