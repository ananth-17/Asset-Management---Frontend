import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';

export interface assetState {
  data: any[];
  totalRecords: number | 0;
  totalPages: number | 0;
  currentPage: number | 0;
}

const initialState: assetState = {
  data: [],
  totalRecords: 0,
  totalPages: 0,
  currentPage: 0
}

export const assetSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    setAssets: (state, action) => {
      state.data = action.payload.data;
      state.totalPages = action.payload.totalPages;
      state.totalRecords = action.payload.totalRecords;
      state.currentPage = action.payload.currentPage;
    },
    addNewAsset: (state: any, action) => {
      state.data = [action.payload.data, ...state.data];
    },
    reset: (state) => {
      state = initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAssets, addNewAsset, reset } = assetSlice.actions;

export const getAssetData = (state: RootState) => state.assets;

export default assetSlice.reducer;