import { useEffect } from "react";
import CardFour from "../component/CardFour";
import CardOne from "../component/CardOne";
import CardThree from "../component/CardThree";
import CardTwo from "../component/CardTwo";
import { useGetAssetTypesMutation } from "../store/api/assetTypeApi";
import { useAppDispatch } from "../store/hooks";
import { setAssetType } from "../store/state/assetTypeSlice";


const Dashboard = () => {

  const dispatch = useAppDispatch();
  const [ getAssetTypes, getAssetTypesResponse] = useGetAssetTypesMutation();

  useEffect(() => {
    getAssetTypes({});
  },[]);

  useEffect(() => {
    if(getAssetTypesResponse.isSuccess)
      dispatch(setAssetType(getAssetTypesResponse.data.data));
  },[getAssetTypesResponse]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>
    </>
  );
};

export default Dashboard;
