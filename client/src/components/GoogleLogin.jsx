import React from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/helper/firebase";
import { AlertPop } from "@/helper/Alert";
import { useNavigate } from "react-router";
import { HomeRoute } from "@/helper/RouteName";

function GoogleLogin() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      const data = {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      if (!response.ok)
        return AlertPop("error", result?.data?.message || "login error");
      navigate(HomeRoute);
      AlertPop("success", result?.data?.message || "login error");
    } catch (error) {
      console.log("Error login : ", error);
      AlertPop("error", `${error?.message || "Error while google-logging"}`);
    }
  };
  return (
    <Button
      variant="ghost"
      className="border mt-5 w-full py-5"
      onClick={handleLogin}
    >
      <FcGoogle />
      Countinue with Google
    </Button>
  );
}

export default GoogleLogin;
