import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// import router here
import authRouter from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

export default app;
