import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCachedAboutData = () => {
  const cachedData = localStorage.getItem("aboutData");

  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data;
    }
  }
  return null;
};

export const fetchAboutData = createAsyncThunk(
  "about/fetchAboutData",
  async () => {
    const cachedData = getCachedAboutData();
    if (cachedData) {
      return cachedData;
    }
    const response = await axios.get(
      "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/about"
    );
    const data = response.data.data;

    localStorage.setItem(
      "aboutData",
      JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
    );

    return data;
  }
);

const aboutSlice = createSlice({
  name: "about",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default aboutSlice.reducer;
