// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { DataTable } from "@/components/ui/data-table/data-table";
// import { categoriesColumns } from "./categories-columns";
// import { Heading } from "@/layout/heading";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { useGetAllCategoryMutation } from "@/lib/store/api/categoryApi";
// import { Separator } from "../../separator";
// import { PlusIcon } from "@heroicons/react/24/outline";

// export default function CategoriesDT() {
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const {
//     data: categories,
//     totalRecords,
//     totalPages,
//     currentPage,
//   } = useAppSelector((state) => state.assets);
//   const [getAllCategories] = useGetAllCategoryMutation();
//   const [currentPage, setCurrentPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         await getAllCategories({
//           searchParam: "",
//           page: currentPage,
//           offset: pageSize,
//         });
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, [getAllCategories, currentPage, pageSize]);

//   return (
//     <>
//       <div className="flex items-center justify-between p-6">
//         <Heading title="Categories" description="Manage categories." />
//         <div className="flex items-center justify-center gap-2">
//           <Button
//             className="w-auto"
//             onClick={() => {
//               navigate("/home/category/add", {
//                 state: { editData: null, editMode: false },
//               });
//             }}
//           >
//             <PlusIcon className="mr-2 h-4 w-4" /> New Category
//           </Button>
//         </div>
//       </div>
//       <Separator />
//       <div className="p-4">
//         <div>
//           <DataTable
//             columns={categoriesColumns}
//             data={categories.data}
//             pageInfo={{
//               pageNumber: 0,
//               pageSize: 0,
//               totalPages: 0,
//               totalElements: 0,
//             }}
//             onPageChange={function (newPage: number): void {
//               throw new Error("Function not implemented.");
//             }}
//             onPageSizeChange={function (newSize: number): void {
//               throw new Error("Function not implemented.");
//             }}
//             fetchPageData={function (
//               page: number,
//               size: number,
//               searchParam: string
//             ): Promise<void> {
//               throw new Error("Function not implemented.");
//             }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
