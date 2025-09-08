import express from "express";
import {
  addCategory,
  getAllCategory,
} from "../controller/category.controller.js";
const categoryRoute = express.Router();

categoryRoute.route("/add").post(addCategory);
categoryRoute.route("/all").get(getAllCategory);

export default categoryRoute;
