import express from "express";
import dotenv from "dotenv";
import connection from "./utils/db.js";
import ErrorHandler from "./middleware/errorHandle.js";
import UserRouter from "./router/auth.js";
import PaymentRouter from "./router/payment.js";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import ProductRouter from "./router/product.js";
import { authenticate } from "./middleware/authenticate.js";
import DashboardRoute from "./router/adminRouter/dashboard.js";
import { adminauth } from "./middleware/adminauth.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

// MiddleWare
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(morgan("dev"));

// File Upload
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Apis
app.use("/api/auth", UserRouter);
app.use("/api/product", authenticate, ProductRouter);
app.use("/api/pay", PaymentRouter);
app.use("/api/dashboard", adminauth, DashboardRoute);
// Error handler
app.use(ErrorHandler);

// Listen
connection().then(() => {
  app.listen(port, () => console.log(`server start at ${port}`));
});
