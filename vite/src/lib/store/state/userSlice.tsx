import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '..';

export interface userState {
  data: any[]
}

const initialState: userState = {
  data: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload.data;
    },
    resetUser: (state) => {
      state = initialState;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, resetUser } = userSlice.actions;

export const getUserData = (state: RootState) => state.user;

export default userSlice.reducer;