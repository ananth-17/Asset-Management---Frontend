import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import FormikDatePicker from "../../component/FormikDatePicker";
import { useNavigate } from "react-router-dom";
import { useAddNewAssetMutation } from "../../store/api/assetApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAssetTypeData, setAssetType } from "../../store/state/assetTypeSlice";
import { useGetCategortByAssetTypeMutation } from "../../store/api/categoryApi";
import { useGetAssetTypesMutation } from "../../store/api/assetTypeApi";
import toast from "react-hot-toast";


const initialValues = {
  assetTypeId: undefined,
  categoryId: undefined,
  brand: "",
  model: "",
  sno: "",
  dop: null,
  invoiceNo: "",
  amount: undefined,
  amcEndDate: "",
  branchId: 1
}

const assetSchema = Yup.object().shape({
  brand: Yup.string().required('Please Enter Brand').matches(/^[a-zA-Z\s.-]+$/, { message: 'Brand must be alphabetic'}),
  categoryId: Yup.string().required('Please Select Category'),
  assetTypeId: Yup.string().required('Please Select Asset Type'),
  model: Yup.string().required('Please Enter Model'),
  sno: Yup.string().required('Please Enter Serial No'),
  amount: Yup.string().required('Please Enter Amount').matches(/^\d+$/, {message: 'Amount must be numeric'}),
});

const inputStyle = "w-2/3 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary";
const leftInputBox = "w-full xl:w-1/2 flex flex-row gap-2";
const rightInputBox = "w-full xl:w-1/2 flex flex-row gap-2 xl:mr-25";

const AddAsset = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [ assetTypeList, setAssetTypeList] = useState(useAppSelector(getAssetTypeData));
  const [ categoryList, setCategoryList] = useState<Array<any>>([]);
  const [ getAllAssetType, getAllAssetTypeResponse ] = useGetAssetTypesMutation();
  const [ addNewAsset, addNewAssetResponse ] = useAddNewAssetMutation();
  const [ getCategoryByAssetType, getCategoryByAssetTypeResponse ] = useGetCategortByAssetTypeMutation();

  useEffect(() => {
    if(assetTypeList === null || assetTypeList.length < 1)
      getAllAssetType({});
  },[assetTypeList]);

  useEffect(() => {
    if(getAllAssetTypeResponse.isSuccess) {
      let typeList = getAllAssetTypeResponse.data.data;
      setAssetTypeList(typeList);
      dispatch(setAssetType(typeList));
    }
  },[getAllAssetTypeResponse])

  useEffect(() => {
    if(getCategoryByAssetTypeResponse.isSuccess) {
      let typeList = getCategoryByAssetTypeResponse.data.data;
      setCategoryList(typeList);
    }
  },[getCategoryByAssetTypeResponse])

  useEffect(() => {
    if(addNewAssetResponse.isSuccess) {
      toast.success('Record added Successfully');
      navigate('/home/assets');
    }
  },[addNewAssetResponse])

  const getCategories = (id: number) => {
    getCategoryByAssetType({assetTypeId : id});
  }

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (values:any) => {
    console.log("Submitted ", values);
    addNewAsset(values);
  }

    return (
      <>
        <div className="flex flex-col gap-10">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark bg-gray-2">
              <h3 className="font-bold text-black dark:text-white">
                Add New Asset
              </h3>
            </div>
            <div className="p-6.5">
              <Formik
                enableReinitialize
                initialValues={formValues}
                onSubmit={handleSubmit}
                onReset={() => {navigate('/home/assets')}}
                validationSchema={assetSchema}
              >
                {({ values, errors, handleChange }) => (
                  <Form>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className={leftInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Brand<span className="text-red">*</span>: 
                        </label>
                        <Field name="brand" type="text" value={values.brand} 
                          className={inputStyle}/> 
                      </div>
                      <div className={rightInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            Model<span className="text-red">*</span>:
                          </label>
                          <Field name="model" type="text" value={values.model} 
                            className={inputStyle}/>  
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className={leftInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Invoice No<span className="text-red">*</span>: 
                        </label>
                        <Field name="invoiceNo" type="text" value={values.invoiceNo}
                          className={inputStyle}/>  
                      </div>
                      <div className={rightInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            Serial No<span className="text-red">*</span>:
                          </label>
                          <Field name="sno" type="text" value={values.sno} 
                            className={inputStyle}/>  
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className={leftInputBox}>
                      <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Asset Type<span className="text-red">*</span>:
                        </label>
                        <Field name="assetTypeId" as="select" value={values.assetTypeId} type="number"
                          className={inputStyle} onChange={(e:any) => {
                            handleChange(e);
                            getCategories(e.target.value);
                            }}>
                        <option key={undefined} value={undefined} >Select...</option>
                          { assetTypeList && assetTypeList.length > 0 &&
                            assetTypeList.map( data => (
                              <option key={data.id} value={data.id}>{data.name}</option>
                            ))}
                        </Field>
                      </div>
                      <div className={rightInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Category<span className="text-red">*</span>: 
                        </label>
                        <Field name="categoryId" as="select" value={values.categoryId} type="number"
                          className={inputStyle}>
                          <option key={undefined} value={undefined} >Select...</option>
                            { categoryList && categoryList.length > 0 &&
                              categoryList.map( data => (
                                <option key={data.id} value={data.id}>{data.name}</option>
                              ))}
                        </Field>
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className={leftInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Date of Purchase<span className="text-red">*</span>: 
                        </label>
                        <FormikDatePicker name="dop" />
                      </div>
                      <div className={rightInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            AMC End Date:
                          </label>
                          <FormikDatePicker name="amcEndDate" />
                      </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                      <div className={leftInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Amount<span className="text-red">*</span>: 
                        </label>
                        <Field name="amount" type="text" value={values.amount} 
                          className={inputStyle}/>  
                      </div>
                      <div className={rightInputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            Branch<span className="text-red">*</span>:
                          </label>
                          <Field name="branchId" as="select" value={values.branchId} className={inputStyle}>
                                <option key={1} value={1}>Chennai One</option>
                          </Field>
                      </div>
                    </div>
                    <div className="flex justify-end gap-4.5 xl:justify-center xl:gap-8">
                      <button
                        className="flex justify-center rounded border border-stroke py-1.5 px-4 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="reset"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary py-1.5 px-4 font-medium text-gray hover:shadow-1"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                    {errors.assetTypeId && <ErrorMessage name={"assetTypeId"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.brand && <ErrorMessage name={"brand"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.categoryId && <ErrorMessage name={"categoryId"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.model && <ErrorMessage name={"model"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.sno && <ErrorMessage name={"sno"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.amount && <ErrorMessage name={"amount"} component="div" className='text-red flex justify-center mt-4'/>}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default AddAsset;