import { useState } from "react";
import TableHead from "../../component/TableHead";
import Pagination from "../../component/Pagination";
import { useNavigate } from "react-router-dom";

interface TableProps {
  tableData: any;
  getDataBySearch(param: string, page: number, offset: number): void;
  tableHeadColumns: Array<any>;
  offset: number;
}

const TableReact = (props: TableProps) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const rowsLimit = props.offset;
  const filteredData = props.tableData.data;
  const customPagination = Array(props.tableData.totalPages).fill(null);
  const { totalPages, currentPage, totalRecords } = props.tableData;
  
  const searchProducts = (keyword: string) => {
    keyword = keyword.toLowerCase();
    setSearchValue(keyword);
    if(keyword.length > 2)
      props.getDataBySearch(keyword, 0, rowsLimit);
    else if(keyword === "")
      props.getDataBySearch("", 0, rowsLimit);
  }
  const clearData = () => {
    setSearchValue("");
    props.getDataBySearch("", currentPage, rowsLimit);
  };

  const nextPage = () => {
    props.getDataBySearch(searchValue, (currentPage + 1), rowsLimit);
  };
  const changePage = (value: number) => {
    props.getDataBySearch(searchValue, value, rowsLimit);
    // const startIndex = value * rowsLimit;
    // const endIndex = startIndex + rowsLimit;
    // const newArray = productList.slice(startIndex, endIndex);
    // setRowsToShow(newArray);
    // setCurrentPage(value);
  };
  const previousPage = () => {
    props.getDataBySearch(searchValue, (currentPage - 1), rowsLimit);
    // if (currentPage > 1) {
    //   setCurrentPage(currentPage - 1);
    // } else {
    //   setCurrentPage(0);
    // }
  };
  
  return (
    <div className="min-h-min h-full bg-white flex items-center justify-center pb-14">
      <div className="w-full mt-3">
        <div className="flex justify-between px-4 mt-2 my-6 py-1">
          <div className="px-2 bg-gray-2 py-1 rounded-lg w-[60%] border border-slate-300">
            <div className="flex items-center gap-2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                  />
              </svg>
              <input
                type="text"
                className="mt-1 w-full text-sm bg-transparent focus:ring-0 border-transparent outline-none placeholder:text-gray-300 text-black w-[85%] placeholder:text-lg"
                placeholder="Search"
                onChange={(e) => searchProducts(e.target.value)}
                value={searchValue}
              />
              <svg
                stroke="currentColor"
                fill="black"
                className={`text-black cursor-pointer ${
                  searchValue?.length > 0 ? "visible" : "invisible"
                }`}
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                onClick={clearData}
              >
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
              </svg>
            </div>
          </div>
          <div className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-gray-2 hover:bg-primary hover:text-white">
            <button
              className="flex justify-between gap-1 px-3 py-1 text-black font-bold hover:text-white min-w-min"
              onClick={() => {navigate('/home/assets/add')}}
            >
              <span><svg className="fill-current my-auto"
                width="18"
                height="18"
                viewBox="-4 -4 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5"/>
              </svg></span>
              NEW</button>
          </div>
        </div>
        <div className="w-full overflow-x-auto md:overflow-auto max-w-7xl 2xl:max-w-none">
          <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-b border-slate-300">
            <TableHead tableHeadColumns={props.tableHeadColumns}/>
            <tbody >
              {filteredData?.map((data: any, index: number) => (
                <tr
                  className={`bg-white text-black ${index + 1 < filteredData?.length 
                    ? "border-b border-[#eee]" : ""
                    }`}
                  key={index}
                >
                  <td className={`py-3 px-4 font-normal text-base whitespace-nowrap`}>
                    {data.id}
                  </td>
                  <td className={`py-3 px-4 font-normal text-base whitespace-nowrap`}>
                    {data.brand}
                  </td>
                  <td className={`py-3 px-4 font-normal text-base whitespace-nowrap`}>
                    {data?.model}
                  </td>
                  <td className={`py-3 px-4 text-base font-normal whitespace-nowrap`}>
                    {data?.sno}
                  </td>
                  <td className={`py-3 px-4 text-base font-normal whitespace-nowrap`}>
                    {data?.invoiceNo}
                  </td>
                  <td className={`py-3 px-4 text-base font-normal whitespace-nowrap`}>
                    {"$" + data?.amount}
                  </td>
                  <td className={`py-3 px-4 text-base font-normal whitespace-nowrap`}>
                    {"$" + data?.tagName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          filteredData={filteredData} 
          currentPage={currentPage} 
          totalPage={totalPages} 
          rowsLimit={rowsLimit}
          totalRecords={totalRecords} 
          customPagination={customPagination} 
          previousPage={previousPage} 
          changePage={changePage}
          nextPage={nextPage}
        />
      </div>
    </div>
  );
};
export default TableReact;