import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCachedEducationData = () => {
  const cachedData = localStorage.getItem("educationData");

  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data;
    }
  }
  return null;
};

export const fetchEducationData = createAsyncThunk(
  "education/fetchEducationData",
  async () => {
    const cachedData = getCachedEducationData();
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(
      "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/education"
    );
    const data = response.data.data;

    // Store in cache with expiry of 1 hour (3600000ms)
    localStorage.setItem(
      "educationData",
      JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
    );

    return data;
  }
);

const educationSlice = createSlice({
  name: "education",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEducationData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchEducationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default educationSlice.reducer;