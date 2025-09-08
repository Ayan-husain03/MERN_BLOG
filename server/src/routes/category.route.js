import express from "express";
import { addCategory } from "../controller/category.controller.js";
const categoryRoute = express.Router();

categoryRoute.route("/add").post(addCategory);

export default categoryRoute;
