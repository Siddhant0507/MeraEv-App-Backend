import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";


import mongoSanitize from "express-mongo-sanitize";
dotenv.config();

//database connection
connectDb();

const PORT = process.env.PORT || 8080;
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
// routes
import userRouter from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/order", orderRoute);

// basic express server
app.get("/", (req, res) => {
  res.send("server is running on port :");
});

app.listen(PORT, () => {
  console.log("server is running on Port :", PORT);
});
