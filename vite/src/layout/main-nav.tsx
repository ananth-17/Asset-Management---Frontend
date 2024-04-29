import { UserNav } from "./user-nav";
import logo from "@/assets/images/logo.jpg";

export default function MainNav() {
  return (
    <div className=" fixed left-0 right-0 top-0 z-20 border-b bg-white shadow-md block">
      <nav className="flex h-16 items-center justify-between px-8 py-5">
        <img
          //   src="https://www.recodesolutions.com/wp-content/uploads/2022/06/logo.png"
          src={logo}
          alt="logo"
          className="h-10 w-auto"
        />

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
