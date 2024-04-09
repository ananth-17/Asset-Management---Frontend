import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
export const assetApis = createApi({
  reducerPath: "assetApis",
  baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8080/" }),
  tagTypes: ["assets"],
  endpoints: (builder) => ({
    getAllAssets: builder.mutation({
      query: (body) => {
        return {
          url:
            "api/asset?" +
            (body.searchParam !== ""
              ? "searchParam=" + body.searchParam + "&"
              : "") +
            "page=" +
            body.page +
            "&size=" +
            body.offset,
          method: "GET",
        };
      },
    }),
    addNewAsset: builder.mutation({
      query: (body) => {
        return {
          url: "api/asset",
          method: "POST",
          body,
        };
      },
    }),
    updateAsset: builder.mutation({
      query: (body) => {
        return {
          url: "api/asset",
          method: "PUT",
          body,
        };
      },
    }),
    downloadQR: builder.mutation({
      query: (body) => {
        return {
          url: `api/asset/qr/${body.id}`,
          method: "GET",
          responseType: "arraybuffer",
        };
      },
    }),
    getAssetById: builder.mutation({
      query: (body) => {
        return {
          url: "api/asset/" + body.id,
          method: "GET",
        };
      },
    }),
    uploadAssetFile: builder.mutation({
      query: (file) => ({
        url: "api/asset/import",
        method: "POST",
        body: file,
      }),
    }),
    generateSampleExcel: builder.query<void, void>({
      query: () => ({
        url: "api/asset/excel/ssample",
        method: "GET",
        responseType: "arraybuffer",
      }),
    }),
  }),
});
export const {
  useGetAllAssetsMutation,
  useAddNewAssetMutation,
  useDownloadQRMutation,
  useGetAssetByIdMutation,
  useUpdateAssetMutation,
  useUploadAssetFileMutation,
  useGenerateSampleExcelQuery,
} = assetApis;
