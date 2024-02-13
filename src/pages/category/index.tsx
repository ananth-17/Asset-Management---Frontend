import { useEffect, useState } from "react";
import Breadcrumb from "../../component/Breadcrumb";
import CategoryData from "../category/CategoryData";
import { useGetAllCategoryMutation } from "../../store/api/categoryApi";
import Loader from "../../component/Loader";

const CATEGORY_TABLE_HEAD = [
  { id: "id", label: "Id"},
  { id: "name", label: "Name"},
  { id: "code", label: "Code"},
  { id: "count", label: "Count"},
  { id: "assetTypeName", label: "Asset Type"},
];

const Category = () => {
  const offset = 5;
  const [isLoading, setIsLoading ] = useState(true);
  const [getAllCategory, getAllCategoryResponse] = useGetAllCategoryMutation();
  const [categoryData, setCategoryData] = useState<any>(null);

  useEffect(() => {
    getCategoryBySearch("", 0 , offset);
  },[]);

  useEffect(() => {
    if(getAllCategoryResponse.isSuccess) {
      setCategoryData(getAllCategoryResponse.data.data);
    }
  },[getAllCategoryResponse.isSuccess]);

  useEffect(() => {
    if(categoryData !== null)
      setIsLoading(false);
  },[categoryData]);

  const getCategoryBySearch = (param: string, page: number, offset: number) => {
    getAllCategory({ searchParam: param, page: page, offset: offset });
  }

  return (
    <>
      <Breadcrumb pageName="Catgeory"/>
      <div className="flex flex-col gap-10 shadow-md">
        {isLoading ?
              <Loader />
              : 
          <CategoryData
            tableData={categoryData}
            getDataBySearch={getCategoryBySearch} 
            tableHeadColumns={CATEGORY_TABLE_HEAD} 
            offset={offset}
          />
        }
      </div>
    </>
  );
};

export default Category;