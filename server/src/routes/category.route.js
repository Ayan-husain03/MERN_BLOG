import express from "express";
import {
  addCategory,
  getAllCategory,
  getCategory,
} from "../controller/category.controller.js";
const categoryRoute = express.Router();

categoryRoute.route("/add").post(addCategory);
categoryRoute.route("/all").get(getAllCategory);
categoryRoute.route("/get/:_id").get(getCategory);

export default categoryRoute;
