import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

interface SidebarNavProps {
  items: {
    href: string;
    title: string;
    icon: ReactNode;
  }[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SidebarNav({
  items,
  isOpen,
  setIsOpen,
}: SidebarNavProps) {
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex flex-row fixed">
      <div
        className={cn(
          " transition-all  duration-300 ease-in-out",
          "overflow-hidden h-screen pt-16 bg-slate-800 lg:w-48 w-24 block",
          isOpen ? "" : "lg:w-24"
        )}
      >
        <div className="py-5 px-3 static">
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    buttonVariants({ variant: "ghost" }),
                    isActive
                      ? "bg-muted hover:bg-muted text-black"
                      : "text-white",
                    "items-center gap-10",
                    isOpen ? "lg:justify-start" : "justify-center",
                    isActive && isOpen ? "lg:justify-start" : "justify-center"
                  )
                }
              >
                <div>
                  <span
                    className={cn(
                      "flex ",
                      isOpen
                        ? "lg:gap-2.5 max-lg:flex-col max-lg:text-[10px] text-[14px] items-center"
                        : " flex-col items-center justify-center text-[10px]"
                    )}
                  >
                    <i>{item.icon}</i>
                    <p className=" content-center">{item.title}</p>
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex my-auto pb-5 cursor-pointer -ml-0.5"
        onClick={handleToggle}
      >
        {isOpen ? (
          <div className="flex h-6 w-6 flex-col items-center ">
            <div
              className="h-3 w-1 rounded-full "
              style={{
                background: "#000",
                transform: "translateY(0.15rem) rotate(15deg) translateZ(0px)",
              }}
            />
            <div
              className="h-3 w-1 rounded-full"
              style={{
                background: "#000",
                transform:
                  "translateY(-0.15rem) rotate(-15deg) translateZ(0px)",
              }}
            />
          </div>
        ) : (
          <div className="flex h-6 w-6 flex-col items-center">
            <div
              className="h-3 w-1 rounded-full"
              style={{
                background: "#000",
                transform: "translateY(0.15rem) rotate(0deg) translateZ(0px)",
              }}
            />
            <div
              className="h-3 w-1 rounded-full"
              style={{
                background: "#000",
                transform: "translateY(-0.15rem) rotate(0deg) translateZ(0px)",
              }}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
