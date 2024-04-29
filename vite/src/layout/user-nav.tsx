import { useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMsal } from "@azure/msal-react";
export function getInitials(name: string | undefined): string {
  return (
    name
      ?.split(" ")
      .map((part, index) => (index < 2 ? part[0].toUpperCase() : ""))
      .join("") ?? ""
  );
}
export function UserNav() {
  //   const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const logout = () => {
    // navigate("/login");
    instance.logoutRedirect();
  };

  const userProfile = accounts[0]?.idTokenClaims;

  return (
    <>
      <div className="gap-2 flex items-center justify-center">
        <Avatar className="h-8 w-8">
          {/* <AvatarImage
            src="https://th.bing.com/th/id/OIP.UWHudS7mu2w5JelU6A6d5wHaF7?w=1280&h=1024&rs=1&pid=ImgDetMain"
            alt="avatar"
          /> */}
          <AvatarFallback className="flex items-center">
            {getInitials(userProfile?.name)}
          </AvatarFallback>
        </Avatar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative w-fit h-fit p-0">
              <span className="text-sm">{userProfile?.name}</span>
              <ChevronDownIcon className="h-4 text-blue-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuGroup>
              <Link to="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
