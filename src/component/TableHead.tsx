

export interface TableHeadProps {
  tableHeadColumns: Array<any>;
}
const TableHead = (props: TableHeadProps) => {
  const head = props.tableHeadColumns;
  return (
    <thead className={`rounded-lg text-base text-white font-semibold w-full`}>
      <tr className="bg-gray-2 border-y border-slate-300 pl-4">
        {head.map((data: any, index: number) => (
          <th className="pr-0.5 pl-7 py-1.5 text-[#212B36] sm:text-base font-bold whitespace-nowrap" key={index}>
            {data.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
export default TableHead;