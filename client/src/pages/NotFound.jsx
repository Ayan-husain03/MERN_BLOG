import Background from "@/components/Background";
import { MoveLeft } from "lucide-react";
import { MoveRight } from "lucide-react";
import React from "react";

function NotFound() {
  return (
    <Background>
      <div className="text-center">
        <h1>404 Page not found</h1>
        <div className="flex gap-2 justify-center items-center cursor-pointer text-blue-500">
          <MoveLeft />
          <a href="/">back</a>
        </div>
      </div>
    </Background>
  );
}

export default NotFound;
