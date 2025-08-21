import React from "react";
import { Input } from "./ui/input";

function SearchBox() {
  return (
    <form>
      <Input className="text-white placeholder:text-white" placeholder="search here...." />
    </form>
  );
}

export default SearchBox;
