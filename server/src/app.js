import express from 'express';
import dotenv from "dotenv";
dotenv.config()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("hello this is from backend")
})

export default app;
