import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Function to get cached data with expiry check
const getCachedHomeData = () => {
  const cachedData = localStorage.getItem("homeData");
  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data; // Return valid cached data
    } else {
      localStorage.removeItem("homeData"); // Remove expired data
    }
  }
  return null;
};

export const fetchHomeData = createAsyncThunk(
  "hero/fetchHomeData",
  async () => {
    const cachedData = getCachedHomeData();
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(
      "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/home"
    );
    const data = response.data.data[0];

    // Cache data with expiry of 1 hour (3600000ms)
    localStorage.setItem(
      "homeData",
      JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
    );

    return data;
  }
);

const heroSlice = createSlice({
  name: "hero",
  initialState: {
    homeData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default heroSlice.reducer;
