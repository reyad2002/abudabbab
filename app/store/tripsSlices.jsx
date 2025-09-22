
// get all trips
// post trip
// update trip
// delete trip
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// GET all trips
export const fetchTripsData = createAsyncThunk(
  "trips/fetchTripsData",
  async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);
// POST trip
export const postTrip = createAsyncThunk(
  "trips/postTrip",
  async ({ url, tripData }) => {
    const response = await axios.post(url, tripData);
    return response.data.data; // return the created trip
  }
);
// update trip
export const updateTrip = createAsyncThunk(
  "trips/updateTrip",
  async ({ url, id, tripData }) => {
    const fullUrl = `${url}/${id}`;
    const response = await axios.put(fullUrl, tripData); // always PUT
    return response.data.data; // assuming API returns updated trip
  }
);
// delete trip
export const deleteTrip = createAsyncThunk(
  "trips/deleteTrip",
  async ({ url, id }) => {
    const fullUrl = `${url}/${id}`;
    await axios.delete(fullUrl);
    return id; // return the deleted trip id so we can remove it from state
  }
);

// GET advanced trips infos
export const fetchAdvancedTripsInfos = createAsyncThunk(
  "trips/fetchAdvancedTripsInfos",
  async (url) => {
    const response = await axios.get(url);
    return response.data.data;
  }
);

const initialState = {
  trips: [],
  advancedTripsInfos: [],
  loading: false,
  advancedLoading: false,
  error: null,
  advancedError: null,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET trip
      .addCase(fetchTripsData.pending, (state) => {
        state.loading = true; //
      })
      .addCase(fetchTripsData.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = action.payload;
      })
      .addCase(fetchTripsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // POST trip
      .addCase(postTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(postTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips.push(action.payload);
      })
      .addCase(postTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE trip
      .addCase(updateTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload; // { id, ...fields }
        const idx = state.trips.findIndex(
          (t) => t.id === updated.id || t._id === updated._id
        );
        if (idx !== -1) {
          state.trips[idx] = { ...state.trips[idx], ...updated };
        } else {
          state.trips.push(updated); // optional fallback
        }
      })
      .addCase(updateTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // DELETE trip
      .addCase(deleteTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.loading = false;
        state.trips = state.trips.filter(
          (t) => t.id !== action.payload && t._id !== action.payload
        );
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET advanced trips infos
      .addCase(fetchAdvancedTripsInfos.pending, (state) => {
        state.advancedLoading = true;
        state.advancedError = null;
      })
      .addCase(fetchAdvancedTripsInfos.fulfilled, (state, action) => {
        state.advancedLoading = false;
        state.advancedTripsInfos = action.payload;
      })
      .addCase(fetchAdvancedTripsInfos.rejected, (state, action) => {
        state.advancedLoading = false;
        state.advancedError = action.error.message;
      });
  },
});

export default tripsSlice.reducer;

// update usage in component
// dispatch(
//   updateTrip({
//     url: "http://localhost:5000/api/trips",
//     id: "12345",
//     tripData: {
//       name: "Summer Trip",
//       destination: "Rome",
//       date: "2025-09-25"
//     }
//   })
// );

// post usage example
// const handleCreateTrip = () => {
//   dispatch(
//     postTrip({
//       url: "http://localhost:5000/api/trips",
//       tripData: {
//         name: "Winter Vacation",
//         destination: "Istanbul",
//         date: "2025-12-20"
//       }
//     })
//   );
// };

// delete usage
// const handleDelete = (id) => {
//   dispatch(
//     deleteTrip({
//       url: "http://localhost:5000/api/trips",
//       id,
//     })
//   );
// };