import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store/store'; // We'll create this next

const SELECTION_LIMIT = 10;

interface SatelliteSelectionState {
  ids: string[];
  error: string | null;
}

const initialState: SatelliteSelectionState = {
  ids: [],
  error: null,
};

export const satelliteSelectionSlice = createSlice({
  name: 'satelliteSelection',
  initialState,
  reducers: {
    // This single action will add or remove an ID
    toggleSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const isSelected = state.ids.includes(id);
      
      state.error = null; // Clear previous error on any new action

      if (isSelected) {
        // If it's already selected, remove it
        state.ids = state.ids.filter(selectedId => selectedId !== id);
      } else {
        // If it's not selected, check the limit before adding it
        if (state.ids.length >= SELECTION_LIMIT) {
          state.error = `Max ${SELECTION_LIMIT} selections allowed.`;
        } else {
          state.ids.push(id);
        }
      }
    },
    // An action to clear the error message manually if needed
    clearSelectionError: (state) => {
        state.error = null;
    },
    // Clear all selected data
    clearAllIdsData: (state) => {
      state.ids = [];
    },
  },
});

// Export the actions to be used in components
export const { toggleSelection, clearSelectionError,clearAllIdsData } = satelliteSelectionSlice.actions;

// Create selectors to easily access state in components
export const selectSelectedIds = (state: RootState) => state.satelliteSelection.ids;
export const selectSelectionError = (state: RootState) => state.satelliteSelection.error;
export const selectSelectionCount = (state: RootState) => state.satelliteSelection.ids.length;

// Export the reducer to be added to the store
export default satelliteSelectionSlice.reducer;