import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { LogIn } from "lucide-react";
import SearchBox from "./SearchBox";
import { HomeRoute, LoginRoute } from "@/helper/RouteName";
import { useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2 } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";
import { AlertPop } from "@/helper/Alert";
import { removeUser } from "@/store/authSlice";
import { ProfileRoute } from "@/helper/RouteName";

function TopBar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {
          method: "get",
          credentials: "include",
        }
      );
      const result = await response.json();
      dispatch(removeUser());
      navigate(HomeRoute);
      AlertPop("success", result.message || "user logout");
      console.log(result);
    } catch (error) {
      console.error("Error in logout", error?.message);
      AlertPop("error", error.message || "Error in logout out");
    }
  };
  return (
    <nav className="flex justify-between items-center px-10 py-3 fixed w-full shadow-2xl">
      <div>
        <h1 className="font-bold text-xl">BlogApp</h1>
      </div>
      <div className="flex  gap-5">
        <SearchBox />
        <div>
          {user.isLoggedIn ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="text-black">
                  <Avatar>
                    <AvatarImage
                      src={
                        user?.user?.avatar ||
                        "https://static.vecteezy.com/system/resources/thumbnails/020/911/731/small_2x/profile-icon-avatar-icon-user-icon-person-icon-free-png.png"
                      }
                    />
                    {/* <AvatarFallback>CN</AvatarFallback> */}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user?.user?.username}</DropdownMenuLabel>
                  <DropdownMenuLabel className={"text-xs"}>
                    {user?.user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to={ProfileRoute} className="flex gap-2 items-center">
                      <User2 />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link className="flex gap-2 items-center">
                      <Plus />
                      Create
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="text-white" />
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to={LoginRoute}>
              <Button className="cursor-pointer">
                <LogIn />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default TopBar;
