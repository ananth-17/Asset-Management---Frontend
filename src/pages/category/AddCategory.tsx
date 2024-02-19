import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAssetTypeData, setAssetType } from '../../store/state/assetTypeSlice';
import { useAddNewCategoryMutation } from '../../store/api/categoryApi';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useGetAssetTypesMutation } from '../../store/api/assetTypeApi';

const initialValues = {
  name: "",
  code: "",
  assetTypeId: undefined
}
const categorySchema = Yup.object().shape({
  name: Yup.string().required('Please Enter Name').matches(/^[a-zA-Z\s.-]+$/, { message: 'Name must be alphabetic!'}),
  code: Yup.string().required('Please Enter Code').matches(/^[a-zA-Z\s.-]+$/, {message: 'Code must be alphabetic!'}),
  assetTypeId: Yup.number().required('Please Select Asset Type!')
});

const inputStyle = "w-2/3 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary";
const inputBox = "w-full xl:w-1/3 flex flex-row gap-1";

const AddCategory = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [assetTypeList, setAssetTypeList] = useState(useAppSelector(getAssetTypeData));
  const [ getAllAssetType, getAllAssetTypeResponse ] = useGetAssetTypesMutation();
  const [ addNewCategory, addNewCategoryResponse ] = useAddNewCategoryMutation();

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

  const [formValues, setFormValues] = useState(initialValues);

  const handleSubmit = (values:any) => {
    console.log("Submitted ", values);
    toast.success('Submitted')
    // addNewCategory(values);
  }

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-bold text-black dark:text-white">
              Add New Category
            </h3>
          </div>
          <div className="p-6.5">
          <Formik
              enableReinitialize
              initialValues={formValues}
              onSubmit={handleSubmit}
              onReset={() => {navigate('/home/category')}}
              validationSchema={categorySchema}
            >
              {({ values, errors, touched }) => (
                <Form>
                  <div className="mb-4.5 flex flex-col gap-2 xl:flex-row">
                      <div className={inputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                          Name<span className="text-red">*</span>: 
                        </label>
                        <Field name="name" type="text" value={values.name} 
                          className={inputStyle}/> 
                      </div>
                      <div className={inputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            Code<span className="text-red">*</span>:
                          </label>
                          <Field name="code" type="text" value={values.code} 
                            className={inputStyle}/>  
                      </div>
                      <div className={inputBox}>
                        <label className="text-right w-1/3 my-auto block text-black dark:text-white whitespace-nowrap">
                            Asset Type<span className="text-red">*</span>:
                          </label>
                          <Field name="assetTypeId" as="select" value={values.assetTypeId} className={inputStyle}>
                          <option key={undefined} value={undefined}>Select...</option>
                            { assetTypeList && assetTypeList.length > 0 &&
                              assetTypeList.map( data => (
                                <option key={data.id} value={data.id}>{data.name}</option>
                              ))}
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
                    {errors.name && <ErrorMessage name={"name"} component="div" className='text-red flex justify-center mt-4'/>}
                    {errors.code && <ErrorMessage name={"code"} component="div" className='text-red flex justify-center mt-4'/>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;