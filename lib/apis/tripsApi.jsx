import {  createAsyncThunk } from "@reduxjs/toolkit";
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
  