import { Navigate, useRoutes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./Auth/SignIn";
import Assets from "./pages/assets";
import AddAsset from "./pages/assets/AddAsset";
import Category from "./pages/category";
import AddCategory from "./pages/category/AddCategory";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

export default function Router() {
  const adminRoutes = [
    {
      path: "/home",
      element: (
        <AuthenticatedTemplate>
          <DefaultLayout />
        </AuthenticatedTemplate>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "assets", element: <Assets /> },
        { path: "assets/add", element: <AddAsset /> },
        { path: "category", element: <Category /> },
        { path: "category/add", element: <AddCategory /> },
      ],
    },
  ];

  return useRoutes([
    ...adminRoutes,
    {
      path: "/",
      element: (
        <UnauthenticatedTemplate>
          <SignIn />
        </UnauthenticatedTemplate>
      ),
      children: [{ path: "home", element: <Navigate to="/home/" /> }],
    },
  ]);
}
