
interface PaginationProps {
  filteredData: Array<any>;
  currentPage: number;
  totalPage: number;
  rowsLimit: number;
  totalRecords: number;
  customPagination: Array<number>;
  previousPage(): void;
  changePage(i: number): void;
  nextPage(): void;
}

const Pagination = (props: PaginationProps) => {
  const { filteredData, currentPage, totalPage, totalRecords, rowsLimit, customPagination, previousPage, changePage, nextPage } = props;

  return (
    <div
          className={`w-full justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-2.5 px-5 items-center ${
            filteredData?.length > 0 ? "flex" : "hidden"
          }`}
        >
          <div className="text-md">
            Showing {currentPage === 0 ? 1 : currentPage * rowsLimit + 1} to{" "}
            {currentPage === totalPage - 1
              ? filteredData?.length
              : (currentPage + 1) * rowsLimit}{" "}
            of {totalRecords} entries
          </div>
          <div className="flex">
            <ul
              className="flex justify-center items-center gap-x-[10px] z-30"
              role="navigation"
              aria-label="Pagination"
            >
              <li
                className={`prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                  currentPage === 0
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={previousPage}
              >
                {/* <img src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" /> */}
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                </svg>
              </li>
              {customPagination?.map((data, index) => (
                <li
                  className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                    currentPage === index
                      ? "text-blue-600  border-sky-500"
                      : "border-[#E4E4EB] "
                  }`}
                  onClick={() => changePage(index)}
                  key={index}
                >
                  {index + 1}
                </li>
              ))}
              <li
                className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                  currentPage === totalPage - 1
                    ? "bg-[#cccccc] pointer-events-none"
                    : " cursor-pointer"
                }`}
                onClick={nextPage}
              >
                {/* <img src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" /> */}
                <svg className="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                </svg>
              </li>
            </ul>
          </div>
        </div>
  )
}

export default Pagination;