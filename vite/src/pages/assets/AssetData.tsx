// import { useState } from "react";
// import TableHead from "../../component/TableHead";
// import Pagination from "../../component/Pagination";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   useUploadAssetFileMutation,
//   useGenerateSampleExcelQuery,
// } from "../../store/api/assetApi";
// import toast from "react-hot-toast";

// interface TableProps {
//   tableData: any;
//   getDataBySearch(param: string, page: number, offset: number): void;
//   tableHeadColumns: Array<any>;
//   offset: number;
//   downloadQR(id: number): void;
// }

// const TableReact = (props: TableProps) => {
//   const navigate = useNavigate();
//   const [searchValue, setSearchValue] = useState("");
//   const rowsLimit = props.offset;
//   const filteredData = props.tableData.data;
//   const customPagination = Array(props.tableData.totalPages).fill(null);
//   const { totalPages, currentPage, totalRecords } = props.tableData;
//   const [uploadAssetFile] = useUploadAssetFileMutation();
//   const { data, error, isLoading } = useGenerateSampleExcelQuery();
//   const handleDownload = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/api/asset/excel/ssample",
//         {
//           responseType: "blob",
//         }
//       );
//       const blob = new Blob([response.data], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", "example.xlsx");
//       document.body.appendChild(link);
//       link.click();
//       window.URL.revokeObjectURL(url);
//       link.remove();
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };
//   const searchProducts = (keyword: string) => {
//     setSearchValue(keyword);
//     if (keyword.length > 2) props.getDataBySearch(keyword, 0, rowsLimit);
//     else if (keyword === "") props.getDataBySearch("", 0, rowsLimit);
//   };
//   const clearData = () => {
//     setSearchValue("");
//     props.getDataBySearch("", currentPage, rowsLimit);
//   };
//   const nextPage = () => {
//     props.getDataBySearch(searchValue, currentPage + 1, rowsLimit);
//   };
//   const changePage = (value: number) => {
//     props.getDataBySearch(searchValue, value, rowsLimit);
//   };
//   const previousPage = () => {
//     props.getDataBySearch(searchValue, currentPage - 1, rowsLimit);
//   };
//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const file = event.target.files[0];
//       handleFileUpload(file);
//     }
//   };
//   const handleFileUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     try {
//       const response = await uploadAssetFile(formData).unwrap();
//       console.log("File uploaded successfully:", response);
//       toast.success("File uploaded successfully");
//     } catch (err) {
//       toast.error("Error uploading file");
//       if (error && "data" in error) {
//         const errorData = error.data as any;
//         if (errorData.message) {
//           toast.error(errorData.message);
//         }
//       }
//     }
//   };

//   return (
//     <div className="min-h-min h-full bg-white flex items-center justify-center pb-4">
//       <div className="w-full mt-3">
//         <div className="flex justify-between px-4 mt-2 my-6 py-1">
//           <div className="px-2 bg-gray-2 py-1 rounded-lg w-[50%] border border-slate-300">
//             <div className="flex items-center gap-2">
//               <svg
//                 className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
//                 width="20"
//                 height="20"
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
//                   fill=""
//                 />
//                 <path
//                   fillRule="evenodd"
//                   clipRule="evenodd"
//                   d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
//                   fill=""
//                 />
//               </svg>
//               <input
//                 type="text"
//                 className="mt-1 text-sm bg-transparent focus:ring-0 border-transparent outline-none placeholder:text-gray-300 text-black w-[85%] placeholder:text-lg"
//                 placeholder="Search"
//                 onChange={(e) => searchProducts(e.target.value)}
//                 value={searchValue}
//               />
//               <svg
//                 stroke="currentColor"
//                 fill="black"
//                 className={`text-black cursor-pointer ${
//                   searchValue?.length > 0 ? "visible" : "invisible"
//                 }`}
//                 strokeWidth="0"
//                 viewBox="0 0 1024 1024"
//                 height="1em"
//                 width="1em"
//                 xmlns="http://www.w3.org/2000/svg"
//                 onClick={clearData}
//               >
//                 <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
//               </svg>
//             </div>
//           </div>
//           <div className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-gray-2 hover:bg-primary hover:text-white">
//             <button
//               className="flex justify-between gap-1 px-3 py-1 text-black font-bold hover:text-white min-w-min"
//               onClick={() => {
//                 navigate("/home/assets/add", {
//                   state: { editData: null, editMode: false },
//                 });
//               }}
//             >
//               <span>
//                 <svg
//                   className="fill-current my-auto"
//                   width="18"
//                   height="18"
//                   viewBox="-4 -4 24 24"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M5 12h14m-7 7V5"
//                   />
//                 </svg>
//               </span>
//               NEW
//             </button>
//           </div>
//           <div className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-gray-2 hover:bg-primary hover:text-white">
//             <input type="file" onChange={handleFileChange} accept=".xlsx" />
//             <button className="flex justify-between gap-1 px-3 py-1 text-black font-bold hover:text-white min-w-min">
//               UPLOAD
//             </button>
//           </div>
//           <div className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-gray-2 hover:bg-primary hover:text-white">
//             <button
//               onClick={handleDownload}
//               className="flex justify-between gap-1 px-3 py-1 text-black font-bold hover:text-white min-w-min"
//             >
//               FILE
//             </button>
//           </div>
//         </div>
//         <div className="w-full overflow-x-auto md:overflow-auto max-w-full 2xl:max-w-none">
//           <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-b border-slate-300">
//             <TableHead tableHeadColumns={props.tableHeadColumns} />
//             <tbody>
//               {filteredData?.map((data: any, index: number) => (
//                 <tr
//                   className={`bg-white text-black ${
//                     index + 1 < filteredData?.length
//                       ? "border-b border-[#eee]"
//                       : ""
//                   }`}
//                   key={index}
//                 >
//                   <td
//                     className={`py-3 pl-7 pr-1 font-normal text-base whitespace-nowrap`}
//                   >
//                     {data.id}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 font-normal text-base whitespace-nowrap`}
//                   >
//                     {data.brand}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 font-normal text-base whitespace-nowrap`}
//                   >
//                     {data?.model}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {data?.sno}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {data?.invoiceNo}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {"INR " + data?.amount}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {data?.tagName}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {data?.assetStatus.status}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     {data?.assignedTo.name}
//                   </td>
//                   <td
//                     className={`py-3 pl-7 pr-1 text-base font-normal whitespace-nowrap`}
//                   >
//                     <div className="flex flex-row gap-4">
//                       <button
//                         className="group relative"
//                         onClick={() => props.downloadQR(data.id)}
//                       >
//                         <span className="absolute -left-5 bottom-5 scale-0 transition-all rounded bg-black p-1 text-xs text-white group-hover:scale-100">
//                           Download QR
//                         </span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
//                           />
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         className="group relative"
//                         onClick={() =>
//                           navigate("/home/assets/add", {
//                             state: { editData: data, editMode: true },
//                           })
//                         }
//                       >
//                         <span className="absolute -left-1 bottom-5 scale-0 transition-all rounded bg-black p-1 text-xs text-white group-hover:scale-100">
//                           Edit
//                         </span>
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="w-6 h-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <Pagination
//           filteredData={filteredData}
//           currentPage={currentPage}
//           totalPage={totalPages}
//           rowsLimit={rowsLimit}
//           totalRecords={totalRecords}
//           customPagination={customPagination}
//           previousPage={previousPage}
//           changePage={changePage}
//           nextPage={nextPage}
//         />
//       </div>
//     </div>
//   );
// };
// export default TableReact;
