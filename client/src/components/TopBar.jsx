import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { LogIn } from "lucide-react";
import SearchBox from "./SearchBox";
import { LoginRoute } from "@/helper/RouteName";

function TopBar() {
  return (
    <nav className="flex justify-between items-center px-10 py-3 fixed w-full shadow-2xl">
      <div>
        <h1 className="bg-red-500">Blog-App</h1>
      </div>
      <div className="flex gap-5">
        <SearchBox />
        <Link to={LoginRoute}>
          <Button className="cursor-pointer">
            <LogIn />
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default TopBar;
