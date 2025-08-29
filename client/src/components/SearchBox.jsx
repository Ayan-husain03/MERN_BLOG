import React from "react";
import { Input } from "./ui/input";

function SearchBox() {
  return (
    <form>
      <Input
        className="text-black w-64 placeholder:text-zinc-500"
        placeholder="search here...."
      />
    </form>
  );
}

export default SearchBox;
