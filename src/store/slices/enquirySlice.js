import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postEnquiry } from '../../utils/api.js';

/**
 * The enquiry is only marked "succeeded" after the server confirms that the
 * email provider accepted the message. Nothing is assumed on the client.
 */
export const submitEnquiry = createAsyncThunk(
  'enquiry/submit',
  async (payload, { rejectWithValue }) => {
    try {
      return await postEnquiry(payload);
    } catch (error) {
      return rejectWithValue({ message: error.message, fieldErrors: error.fieldErrors || null });
    }
  },
  {
    // Blocks duplicate submissions while a request is already in flight.
    condition: (_payload, { getState }) => getState().enquiry.status !== 'loading',
  }
);

const initialState = { status: 'idle', error: null, fieldErrors: null };

const enquirySlice = createSlice({
  name: 'enquiry',
  initialState,
  reducers: {
    resetEnquiry: () => initialState,
    clearEnquiryError(state) {
      state.error = null;
      state.fieldErrors = null;
      if (state.status === 'failed') state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEnquiry.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.fieldErrors = null;
      })
      .addCase(submitEnquiry.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.status = 'failed';
        state.error =
          action.payload?.message || 'Your enquiry could not be sent. Please try again.';
        state.fieldErrors = action.payload?.fieldErrors || null;
      });
  },
});

export const { resetEnquiry, clearEnquiryError } = enquirySlice.actions;
export default enquirySlice.reducer;
