import MainNav from "./main-nav";
import SidebarNav from "./sidebar-nav";
import { useState } from "react";
// import Loader from "@/components/layout/loader";

import { Outlet } from "react-router-dom";
import { LayoutDashboard, List, PackageSearch } from "lucide-react";
import { Toaster } from "sonner";
import { Suspense } from "react";
// import Loader from "./loader";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: <PackageSearch size={20} />,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: <List size={20} />,
  },
];

export const DefaultLayout = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <MainNav />
      <div className="flex">
        <SidebarNav
          items={sidebarNavItems}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <main
          className={`flex-1 overflow-y-auto overflow-x-hidden scroll-smooth pt-16 bg-secondary/10 pb-1 transition-all  duration-300 ease-in-out ${
            isSidebarOpen ? "lg:ml-[12rem] ml-[6rem]" : "ml-[6rem]"
          }`}
        >
          {/* {isLoading ? (
            <Loader />
          ) : ( */}
          {/* <Suspense fallback={<Loader />}> */}
          <Outlet />
          {/* </Suspense> */}
          {/* )} */}
        </main>
        <Toaster position="top-right" richColors closeButton />
      </div>
    </>
  );
};
