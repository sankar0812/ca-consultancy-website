import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { mobileMenuOpen: false, scrolled: false },
  reducers: {
    openMobileMenu(state) {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setScrolled(state, action) {
      state.scrolled = action.payload;
    },
  },
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu, setScrolled } = uiSlice.actions;
export default uiSlice.reducer;
