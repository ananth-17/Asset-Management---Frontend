import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const assetTypeApi = createApi({
  reducerPath: 'assetTypeApi',
  baseQuery: axiosBaseQuery({baseUrl: "http://localhost:8080/"}),
  tagTypes: ['asset-type'],
  endpoints: (builder) => ({
    getAssetTypes: builder.mutation({
      query() {
        return {
          url: "api/asset-type",
          method: 'GET'
        };
      }
    }),
  })
});

export const {
  useGetAssetTypesMutation
} = assetTypeApi;