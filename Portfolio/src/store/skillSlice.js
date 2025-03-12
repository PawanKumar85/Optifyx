import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCachedSkillData = () => {
  const cachedData = localStorage.getItem("skillData");

  if (cachedData) {
    const { data, expiry } = JSON.parse(cachedData);
    if (new Date().getTime() < expiry) {
      return data;
    }
  }
  return null;
};

export const fetchSkillData = createAsyncThunk(
  "experience/fetchSkillData",
  async () => {
    const cachedData = getCachedSkillData();
    if (cachedData) {
      return cachedData;
    }

    const response = await axios.get(
      "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/skill"
    );
    const data = response.data.data;

    // Store data in localStorage with expiry time (1 hour)
    localStorage.setItem(
      "skillData",
      JSON.stringify({ data, expiry: new Date().getTime() + 3600000 })
    );

    return data;
  }
);

const skillSlice = createSlice({
  name: "skill",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSkillData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSkillData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default skillSlice.reducer;
