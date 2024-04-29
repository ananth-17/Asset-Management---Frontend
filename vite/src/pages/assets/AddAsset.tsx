import { Link, useLocation, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

export default function AddAsset() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const [date, setDate] = useState<Date | null>(null);

  const [formValues, setFormValues] = useState({
    brand: "",
    model: "",
    dateOfPurchase: "",
    serialNumber: "",
    assetType: "",
    amount: "",
  });

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
    // Add your submit logic here
  };

  return (
    <>
      <div className="flex items-center px-8 py-6">
        <Link to="/assets">
          <Button variant="ghost" className="text-zinc-400 order-none ">
            <ChevronLeftIcon className="h-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight my-0 mx-auto">
          Add Asset
        </h1>
        <Button variant="outline" className="gap-1">
          <ArrowDownTrayIcon className="h-4 w-4" />
          Template
        </Button>
      </div>
      <div className="pt-3 pb-6 px-[60px] gap-y-6 flex flex-col max-lg:gap-4">
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          // Add your validation schema if you have one
        >
          {({ values, handleChange, handleReset }) => (
            <Form className="pt-3 pb-6 px-[60px] gap-y-6 flex flex-col max-lg:gap-4">
              <div className="flex gap-x-[60px] w-full max-lg:flex-col max-lg:gap-y-6">
                <div className="flex flex-col w-full gap-y-2">
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    name="brand"
                    placeholder="Brand"
                    value={values.brand}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    name="model"
                    placeholder="Model"
                    value={values.model}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-x-[60px] w-full max-lg:flex-col max-lg:gap-y-6">
                <div className="flex gap-x-[60px] w-full max-lg:flex-col max-lg:gap-y-6">
                  <div className="flex flex-row gap-x-[30px] w-full">
                    <div className="flex flex-col gap-y-2 w-1/2">
                      <Label htmlFor="date">Date of Purchase</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex flex-col gap-y-2 w-1/2">
                      <Label htmlFor="date">AMC End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="flex flex-col w-full gap-y-2">
                    <Label htmlFor="serial">Serial No.</Label>
                    <Input
                      id="serial"
                      name="serialNumber"
                      placeholder="Serial No."
                      value={values.serialNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-x-[60px] w-full max-lg:flex-col max-lg:gap-y-6">
                <div className="flex flex-col w-full gap-y-2">
                  <Label htmlFor="asset">Asset Type</Label>
                  <Input
                    id="asset"
                    name="assetType"
                    placeholder="Asset Type"
                    value={values.assetType}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full gap-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="Amount"
                    value={values.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

{
  /* <SheetTitle>Add New Assets</SheetTitle>
                  <SheetDescription className="flex justify-between">
                    <div className="max-w-lg">
                      Upload a file or fill out the form below. Alternatively,
                      you can download a template file to assist with asset
                      uploads. Here's a template for reference.
                    </div>
                    <Button variant="outline" className="gap-2">
                      <ArrowDownTrayIcon className="w-4 h-4" />
                      Template
                    </Button>
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                <div className="flex flex-col gap-y-4">
                  <Label className="text-md font-semibold text-foreground">
                    Add an Asset
                  </Label>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" placeholder="Brand" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="model">Model</Label>
                      <Input id="model" placeholder="Model" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="date">Date of Purchase</Label>
                      <Input
                        id="date"
                        placeholder="Date of Purchase"
                        type="date"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="serial">Serial No.</Label>
                      <Input id="serial" placeholder="Serial No." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="asset">Asset</Label>
                      <Input id="asset" placeholder="Asset" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="amount">Amount</Label>
                      <Input id="amount" placeholder="Amount" />
                    </div>
                  </div>
                  <Button>Submit</Button>
                </div>

                <Label>Upload file</Label>
                <div>
                  <FileUploader
                    maxFiles={1}
                    maxSize={8 * 1024 * 1024}
                    onValueChange={setFiles}
                    accept={[
                      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                      "text/csv",
                    ]}
                  />
                </div>
              </SheetContent> */
}
