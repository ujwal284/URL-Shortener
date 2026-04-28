import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
  //  console.log("Connected to:", process.env.MONGO_URI);
    console.log("MongoDB connected");
    app.listen(8000, () => {
      console.log("Server running on port 8000");
    });
  })
  .catch(err => console.log(err));