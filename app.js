import express from "express";
import sequelize, { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT | 3000;

const serverSetup = async () => {
  await connectDB();
  sequelize.sync().then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  });
};

serverSetup();
