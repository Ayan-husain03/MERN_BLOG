import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import { LoginRoute, ProfileRoute, SignupRoute } from "./helper/RouteName";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={ProfileRoute} element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path={SignupRoute} element={<Signup />} />
          <Route path={LoginRoute} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
