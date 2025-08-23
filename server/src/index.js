import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

connectDb()
  .then(
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    })
  )
  .catch((error) => {
    console.log("Mongo db error", error);
    process.exit(1);
  });
