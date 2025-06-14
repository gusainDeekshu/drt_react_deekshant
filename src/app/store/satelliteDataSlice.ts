import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SatelliteData } from '@/types';
import { RootState } from './store';

const SELECTION_LIMIT = 10;
// This slice can have its own state, independent of the selection slice
interface SatelliteDataState {
  selected: SatelliteData[];
}

const initialState: SatelliteDataState = {
  selected: [],
};

export const satelliteDataSlice = createSlice({
  name: 'satelliteData',
  initialState,
  reducers: {
    // Toggle satellite selection
    toggleSatelliteData: (state, action: PayloadAction<SatelliteData>) => {
      const satellite = action.payload;
      const index = state.selected.findIndex(s => s.noradCatId === satellite.noradCatId);

      if (index !== -1) {
        // If it's already selected, remove it
        state.selected.splice(index, 1);
      } else {
         if (state.selected.length >= SELECTION_LIMIT) {
         console.log("limit exceeded");
        } else {
       // If not selected, add it
        state.selected.push(satellite);
        }
        
      }
    },
    // Clear all selected data
    clearAllData: (state) => {
      state.selected = [];
    },
  },
});

export const { toggleSatelliteData, clearAllData } = satelliteDataSlice.actions;

// Selector to get the array of selected satellite data
export const selectSelectedData = (state: RootState) => state.satelliteData.selected;

export default satelliteDataSlice.reducer;
