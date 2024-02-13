import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';

export interface assetTypeState {
  data: any[];
}

const initialState: assetTypeState = {
  data: []
}

export const assetTypeSlice = createSlice({
  name: 'assetType',
  initialState,
  reducers: {
    setAssetType: (state, action) => {
      state.data = action.payload;
    },
    reset: (state) => {
      state = initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAssetType, reset } = assetTypeSlice.actions;

export const getAssetTypeData = (state: RootState) => state.assetType.data;

export default assetTypeSlice.reducer;