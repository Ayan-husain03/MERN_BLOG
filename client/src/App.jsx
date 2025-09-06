import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import {
  AddCategoryRoute,
  CategoryDetailsRoute,
  EditCategoryRoute,
  LoginRoute,
  ProfileRoute,
  SignupRoute,
} from "./helper/RouteName";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import AddCategory from "./pages/category/AddCategory";
import CategoryDetails from "./pages/category/CategoryDetails";
import EditCategory from "./pages/category/EditCategory";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={ProfileRoute} element={<Profile />} />
            <Route path={AddCategoryRoute} element={<AddCategory />} />
            <Route path={CategoryDetailsRoute} element={<CategoryDetails />} />
            <Route path={EditCategoryRoute()} element={<EditCategory />} />
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
