import { useField } from "formik";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";

interface DatePickerProps {
  name: string;
}

const FormikDatePicker = (props: DatePickerProps) => {
  const { name } = props;
  const [field, meta, helpers] = useField(name);

  const { value } = meta;
  const { setValue } = helpers;

  return (
    <Datepicker
      {...field} value={{ startDate: value, endDate: value }} onChange={(date) => setValue(date?.startDate)} asSingle={true} useRange={false}
      containerClassName="relative w-2/3" placeholder="Select a Date"
      inputClassName="relative transition-all duration-300 py-1 pl-2 pr-14 w-full border-[1.5px] border-stroke dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded font-medium placeholder-gray-400 bg-transparent disabled:opacity-40 disabled:cursor-not-allowed focus:border-primary active:border-primary outline-none" 
    />
  );
}

export default FormikDatePicker;