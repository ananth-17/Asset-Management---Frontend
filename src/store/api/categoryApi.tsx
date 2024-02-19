import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: axiosBaseQuery({baseUrl: "http://localhost:8080/"}),
  tagTypes: ['category'],
  endpoints: (builder) => ({
    getAllCategory: builder.mutation({
      query: body => {
        return {
          url: "api/category?" + (body.searchParam !== "" ? "searchParam=" + body.searchParam + "&" : "")
            + "page=" + body.page + "&size=" + body.offset,
          method: 'GET'
        };
      }
    }),
    addNewCategory: builder.mutation({
      query: body => {
        return {
          url: "api/category?",
          method: 'POST',
          body
        };
      }
    }),
    getCategortByAssetType: builder.mutation({
      query: body => {
        return {
          url: "api/category/assetType/" + body.assetTypeId,
          method: 'GET'
        };
      }
    }),
  })
});

export const {
  useGetAllCategoryMutation,
  useAddNewCategoryMutation,
  useGetCategortByAssetTypeMutation
} = categoryApi;