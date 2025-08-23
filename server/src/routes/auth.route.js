import express from "express";
import { registerUser } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);

export default authRouter;
