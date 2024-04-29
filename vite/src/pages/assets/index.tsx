import { Outlet } from "react-router-dom";

export default function Asset() {
  return (
    <>
      <div className="m-5 rounded-md bg-white">
        <Outlet />
      </div>
    </>
  );
}
