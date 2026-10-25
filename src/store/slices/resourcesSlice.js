import { createSlice } from '@reduxjs/toolkit';

const resourcesSlice = createSlice({
  name: 'resources',
  initialState: { activeCategory: 'all', openFaqId: null },
  reducers: {
    setCategory(state, action) {
      state.activeCategory = action.payload;
    },
    toggleFaq(state, action) {
      state.openFaqId = state.openFaqId === action.payload ? null : action.payload;
    },
  },
});

export const { setCategory, toggleFaq } = resourcesSlice.actions;
export default resourcesSlice.reducer;
