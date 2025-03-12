import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for form submission
export const submitContactForm = createAsyncThunk(
  "contact/submitForm",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://portfolio-backend-image-v3.onrender.com/api/v2/portfolio/contacts",
        formData
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "An error occurred while submitting the form."
      );
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetFormState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetFormState } = contactSlice.actions;
export default contactSlice.reducer;
