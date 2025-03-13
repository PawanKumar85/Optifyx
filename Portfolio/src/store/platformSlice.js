import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PLATFORM_API = `${import.meta.env.VITE_API_ENDPOINT}/platform`;

const getCachedPlatformData = () => {
  const cachedData = localStorage.getItem("platformData");
  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data;
    }
  }
  return null;
};

export const fetchPlatformData = createAsyncThunk(
  "platform/fetchPlatformData",
  async (_, { rejectWithValue }) => {
    const cachedData = getCachedPlatformData();
    if (cachedData) {
      return cachedData;
    }
    try {
      const response = await axios.get(PLATFORM_API);
      const data = response.data.data;
      localStorage.setItem(
        "platformData",
        JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch platform data"
      );
    }
  }
);

const platformSlice = createSlice({
  name: "platform",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatformData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlatformData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPlatformData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default platformSlice.reducer;
