import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Table from "./AssetData";
import { useGetAllAssetsMutation } from "../../store/api/assetApi";
import { useAppDispatch } from "../../store/hooks";
import { setAssets } from "../../store/state/assetSlice";
import Loader from "../../component/Loader";

const ASSET_TABLE_HEAD = [
  { id: "id", label: "ID"},
  { id: "brand", label: "BRAND"},
  { id: "model", label: "MODEL"},
  { id: "sno", label: "S NO"},
  { id: "invoiceNo", label: "INVOICE NO"},
  { id: "amount", label: "AMOUNT"},
  { id: "tagName", label: "TAG NAME"}
];

const Assets = () => {
  const dispatch = useAppDispatch();
  const offset = 5;
  const [isLoading, setIsLoading ] = useState(true);
  const [getAllAssets, getAllAssetsResponse] = useGetAllAssetsMutation();
  const [assetData, setAssetData] = useState<any>(null);

  useEffect(() => {
    getAssetBySearch("", 0 , offset);
  },[]);

  useEffect(() => {
    if(getAllAssetsResponse.isSuccess) {
      dispatch(setAssets(getAllAssetsResponse.data.data));
      setAssetData(getAllAssetsResponse.data.data);
    }
  },[getAllAssetsResponse.isSuccess]);

  useEffect(() => {
    if(assetData !== null)
      setIsLoading(false);
  },[assetData]);

  const getAssetBySearch = (param: string, page: number, offset: number) => {
    getAllAssets({ searchParam: param, page: page, offset: offset });
  } 

  return (
      <>
        <Breadcrumb pageName="Assets"/>
        <div className="flex flex-col gap-10 shadow-md">
          {isLoading ?
            <Loader />
            : 
            <Table
              tableData={assetData}
              getDataBySearch={getAssetBySearch}
              tableHeadColumns={ASSET_TABLE_HEAD}
              offset={offset}
            />
          }
        </div>
      </>
    );
  };
  
  export default Assets;