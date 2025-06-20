import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import databaseConnection from "./src/config/databaseConnection.js";
import { logRequest } from "thirtyfour";
import logger from "thirtyfour";

//express app
const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(logRequest);

//connect to the mongoDB database
databaseConnection();

//creating a server
const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  logger.success(
    `Server is running on http://localhost:${PORT} in ${process.env.ENVIRONMENT} mode...`
  );
});

//root route
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Chatly API is running...",
  });
});

//importing routes
import authRoutes from "./src/routes/authRoute.js";
app.use("/api/v1/auth", authRoutes);

import searchRoutes from "./src/routes/searchRoute.js";
app.use("/api/v1", searchRoutes);
