import { configureStore } from '@reduxjs/toolkit';
import assetReducer from './state/assetSlice';
import assetTypeReducer from './state/assetTypeSlice';
import userReducer from './state/userSlice';
import { assetApis } from './api/assetApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { assetTypeApi } from './api/assetTypeApi';
import { categoryApi } from './api/categoryApi';

export const store = configureStore({
  reducer: {
    assets: assetReducer,
    assetType: assetTypeReducer,
    user: userReducer,
    [assetApis.reducerPath]: assetApis.reducer,
    [assetTypeApi.reducerPath]: assetTypeApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer
  },
  middleware : (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
    .concat(assetApis.middleware)
    .concat(assetTypeApi.middleware)
    .concat(categoryApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch);