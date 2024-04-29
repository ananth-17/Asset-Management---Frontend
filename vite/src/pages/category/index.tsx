import React from "react";
import { Outlet } from "react-router-dom";

export default function Category() {
  return (
    <>
      <div className="m-5 rounded-md bg-white">
        <Outlet />
      </div>
    </>
  );
}
