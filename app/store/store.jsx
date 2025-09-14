import { configureStore } from '@reduxjs/toolkit';
import tripsReducer from './tripsSlices'; // اسم الملف مفضّل يكون مفرد
import bookingReducer from './bookingSlice'; // اسم الملف مفضّل يكون مفرد

// Safely read persisted bookings from localStorage (client-side only)
function loadPersistedBookings() {
  if (typeof window === 'undefined') return undefined;
  try {
    const raw = window.localStorage.getItem('abudabbab:bookings');
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (_) {
    // ignore
  }
  return undefined;
}

const preloadedBookingsState = loadPersistedBookings();

const tripsStore = configureStore({
  reducer: {
    trips: tripsReducer,
    bookings: bookingReducer,
  },
  // Only preload the bookings slice if available, with the correct nested shape
  preloadedState: preloadedBookingsState
    ? { bookings: { bookings: preloadedBookingsState } }
    : undefined,
});

// Persist bookings slice on any change (client-side only)
if (typeof window !== 'undefined') {
  tripsStore.subscribe(() => {
    try {
      const state = tripsStore.getState();
      // We only persist the inner bookings object (state.bookings.bookings)
      const dataToPersist = state?.bookings?.bookings ?? {};
      window.localStorage.setItem(
        'abudabbab:bookings',
        JSON.stringify(dataToPersist)
      );
    } catch (_) {
      // ignore storage errors
    }
  });
}

export default tripsStore;
