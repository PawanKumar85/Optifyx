import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const PROJECT_API = `${import.meta.env.VITE_API_ENDPOINT}/project`;

// Function to check cached project data
const getCachedProjectData = () => {
  const cachedData = localStorage.getItem("projectData");
  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data;
    }
  }
  return null;
};

// Async thunk to fetch project data
export const fetchProjectData = createAsyncThunk(
  "projects/fetchProjectData",
  async () => {
    const cachedData = getCachedProjectData();
    if (cachedData) {
      return cachedData; // Return cached data if available
    }

    // Fetch from API if no valid cached data
    const response = await axios.get(PROJECT_API);
    const data = response.data.data;

    localStorage.setItem(
      "projectData",
      JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
    );

    return data;
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default projectSlice.reducer;
