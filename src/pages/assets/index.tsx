import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import Table from "./AssetData";
import { useDownloadQRMutation, useGetAllAssetsMutation } from "../../store/api/assetApi";
import { useAppDispatch } from "../../store/hooks";
import { setAssets } from "../../store/state/assetSlice";
import Loader from "../../component/Loader";
import ImageModal from "../../component/ImageModal";

const ASSET_TABLE_HEAD = [
  { id: "id", label: "ID"},
  { id: "brand", label: "BRAND"},
  { id: "model", label: "MODEL"},
  { id: "sno", label: "S NO"},
  { id: "invoiceNo", label: "INVOICE NO"},
  { id: "amount", label: "AMOUNT"},
  { id: "tagName", label: "TAG NAME"},
  { id: "action", label: "ACTION"}
];

const Assets = () => {
  const dispatch = useAppDispatch();
  const offset = 5;
  const [isLoading, setIsLoading ] = useState(true);
  const [error, setError ] = useState(false);
  const [image, setImage ] = useState("");
  const [showImageModal, setShowImageModal ] = useState(false);
  const [getAllAssets, getAllAssetsResponse] = useGetAllAssetsMutation();
  const [assetData, setAssetData] = useState<any>(null);
  const [ getAssetQR , getAssetQRResponse ] = useDownloadQRMutation();

  useEffect(() => {
    getAssetBySearch("", 0 , offset);
  },[]);

  useEffect(() => {
    console.log("getAllAssetsResponse ", getAllAssetsResponse);
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

  const downloadQR = (id: number) => {
    getAssetQR({id: id});
  }

  useEffect(() => {
    if(getAssetQRResponse.isSuccess) {
      const base64 = btoa(
        new Uint8Array(getAssetQRResponse.data.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      setImage(base64)
    }
  },[getAssetQRResponse.isSuccess]);

  useEffect(() => {
    if(image !== "")
     setShowImageModal(true);
  },[image]);

  const downloadAssetQR = (image: string) => {
    var a = document.createElement("a"); //Create <a>
    a.href = "data:image/png;base64," + image; //Image Base64 Goes here
    a.download = "Image.png"; //File name Here
    a.click(); //Downloaded file
    setShowImageModal(false);
  }

  return (
      <>
        <Breadcrumb pageName="Assets"/>
        <div className="flex flex-col gap-10 shadow-md">
          {isLoading ?
            <Loader />
            : error ? <></> :
            <Table
              tableData={assetData}
              getDataBySearch={getAssetBySearch}
              tableHeadColumns={ASSET_TABLE_HEAD}
              offset={offset}
              downloadQR={downloadQR}
            />
          }
        </div>
        {showImageModal && <ImageModal image={image} setShowImageModal={setShowImageModal} downloadAssetQR={downloadAssetQR}/>}
      </>
    );
  };
  
  export default Assets;