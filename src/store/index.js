import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice.js';
import enquiryReducer from './slices/enquirySlice.js';
import resourcesReducer from './slices/resourcesSlice.js';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    enquiry: enquiryReducer,
    resources: resourcesReducer,
  },
});
