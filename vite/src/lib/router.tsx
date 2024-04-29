import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { DefaultLayout } from "./../layout/DefaultLayout";
// import Dashboard from "./pages/Dashboard";
import SignIn from "./../Auth/SignIn";
// import Assets from "./pages/assets";
import AddAsset from "@/pages/assets/AddAsset";
// import Category from "./pages/category";
// import AddCategory from "./pages/category/AddCategory";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import AssetDT from "@/components/ui/data-table/assets";
// import CategoriesDT from "@/components/ui/data-table/categories";
import Dashboard from "@/pages/Dashboard";
import Asset from "@/pages/assets";
import Category from "@/pages/category/index";
import CategoriesDT from "@/components/ui/data-table/categories";

export default createBrowserRouter([
  {
    path: "/signin",
    element: (
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    ),
  },
  {
    path: "/",
    element: (
      <AuthenticatedTemplate>
        <DefaultLayout />
      </AuthenticatedTemplate>
    ),
    ErrorBoundary: () => {
      const error: any = useRouteError();
      switch (error.response?.status) {
        case 404:
          return <Navigate to="/404" />;
        case 500:
          return <Navigate to="/500" />;
        default:
          return (
            <div>
              <h1>Oops, something went wrong!</h1>
              <p>{error.message}</p>
            </div>
          );
      }
    },
    id: "root",
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },

      // {
      //   path: "/404",
      //   element: <NotFound />,
      // },
      // {
      //   path: "/500",
      //   element: <InternalServerError />,
      // },
      {
        path: "/assets",
        element: <Asset />,
        children: [
          {
            path: "",
            element: <AssetDT />,
          },
          {
            path: "add",
            element: <AddAsset />,
          },
          // {
          //   path: "edit/:id",
          //   element: <EditIDDetails />,
          // },
          // {
          //   path: "view/:id",
          //   element: <ViewIDIssuedDetails />,
          // },
        ],
      },
      {
        path: "/categories",
        element: <Category />,
        children: [
          {
            path: "",
            // element: <CategoriesDT />,
          },
          // {
          //   path: "add",
          //   element: <AddEmpCard />,
          // },
          // {
          //   path: "edit/:id",
          //   element: <EditIDDetails />,
          // },
          // {
          //   path: "view/:id",
          //   element: <ViewIDIssuedDetails />,
          // },
        ],
      },
    ],
  },
]);

// export default function Router() {
//   const adminRoutes = [
//     {
//       path: "/home",
//       element: (
//         <AuthenticatedTemplate>
//           <DefaultLayout />
//         </AuthenticatedTemplate>
//       ),
//       children: [
//         { path: "dashboard", element: <Dashboard /> },
//         { path: "assets", element: <Assets /> },
//         { path: "assets/add", element: <AddAsset /> },
//         { path: "category", element: <Category /> },
//         { path: "category/add", element: <AddCategory /> },
//       ],
//     },
//   ];

//   return useRoutes([
//     ...adminRoutes,
//     {
//       path: "/",
//       element: (
//         <UnauthenticatedTemplate>
//           <SignIn />
//         </UnauthenticatedTemplate>
//       ),
//       children: [{ path: "home", element: <Navigate to="/home/" /> }],
//     },
//   ]);
// }
