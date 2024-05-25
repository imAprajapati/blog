// app.js
import express from "express";
import logger from "morgan";
import { fileURLToPath } from "url";
import path, { join, dirname } from "path";
const app = express();
import cors from "cors";
import { globalErrorHandler } from "./utils/errorController.js";
import ApiResponse from "./utils/ApiResponse.js";
import asyncErrorHandler from "./utils/asyncErrorHandler.js";

import cookieParser from "cookie-parser";
// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import all routes here
import userRoutes from "./routers/user.routes.js";
import blogPostRoutes from "./routers/blog.routes.js";
import commentRoutes from "./routers/comment.routes.js";

app.use(cookieParser());


app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/comments', commentRoutes);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);
}); // This is the catch all route handler

app.use(globalErrorHandler); // This is the error handler middleware

export default app;
