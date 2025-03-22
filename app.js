import express from "express";
import sequelize, { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";
import "./src/models/assosiation.js";
import appRoute from "./src/routes/index.js";
import errorMiddleware from "./src/middleware/errorMidlleware.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", appRoute);

app.use(errorMiddleware);

const port = process.env.PORT | 3000;

const serverSetup = async () => {
  await connectDB();
  sequelize.sync({ alter: true }).then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  });
};

serverSetup();
