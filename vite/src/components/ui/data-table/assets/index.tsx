import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/data-table/data-table";
import { assetsColumns } from "./assets-columns";
import { Heading } from "@/layout/heading";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useGetAllAssetsMutation } from "@/lib/store/api/assetApi";
import { setAssets } from "@/lib/store/state/assetSlice";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export default function AssetDT() {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const dispatch = useAppDispatch();
  const {
    data: assets,
    totalRecords,
    totalPages,
    currentPage,
  } = useAppSelector((state) => state.assets);
  const [getAllAssets, getAllAssetsResponse] = useGetAllAssetsMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssetData = async () => {
      try {
        const response = await getAllAssets({
          searchParam: "",
          page: 0,
          offset: 10,
        }).unwrap();
        dispatch(setAssets(response));
      } catch (error) {
        console.error("Error fetching asset data:", error);
      }
    };
    fetchAssetData();
  }, [getAllAssets, dispatch]);

  return (
    <>
        <div className="flex items-center justify-between p-6">
          <Heading title="Assets" description="Manage assets." />
          <div className="flex items-center justify-center gap-2">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="w-auto" variant="outline">
                  <ArrowDownTrayIcon className="mr-2 h-4 w-4" /> Export Data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Export Data</DialogTitle>
                  <DialogDescription>
                    Export data to a CSV file to use in other applications.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col w-full gap-2 items-start justify-center">
                  <Label>Choose Date:</Label>
                  {/* <DatePickerWithRange
                  className="w-full"
                  onChange={handleDateRangeChange}
                /> */}
                </div>
                <DialogFooter>
                  <Button
                  //   onClick={handleExport}
                  //   disabled={!dateRange.startDate || !dateRange.endDate}
                  >
                    Download
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              className="w-auto"
              onClick={() => {
                navigate("add");
              }}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          </div>
        </div>
        <Separator />
        <div className="p-4">
          <div>
            <DataTable
              columns={assetsColumns}
              data={assets.data}
              pageInfo={{
                pageNumber: 0,
                pageSize: 0,
                totalPages: 0,
                totalElements: 0,
              }}
              onPageChange={function (newPage: number): void {
                throw new Error("Function not implemented.");
              }}
              onPageSizeChange={function (newSize: number): void {
                throw new Error("Function not implemented.");
              }}
              fetchPageData={function (
                page: number,
                size: number,
                searchParam: string
              ): Promise<void> {
                throw new Error("Function not implemented.");
              }} // pageInfo={pageInfo}
              // onPageChange={(newPage) => {
              //   console.log(`Page changed to: ${newPage}`);
              //   fetchPageData(newPage, pageInfo.pageSize);
              // }}
              // onPageSizeChange={(newSize) => {
              //   console.log(`Page size changed to: ${newSize}`);
              //   fetchPageData(pageInfo.pageNumber, newSize);
              // }}
              // fetchPageData={fetchPageData}
              // statusType="returnStatus"
            />
          </div>
        </div>
    </>
  );
}
