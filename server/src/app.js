import errorHandler from "./middleware/errorHandler.middlerware.js";
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
app.use(errorHandler);

// import router here
import authRouter from "./routes/auth.route.js";
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);

export default app;
