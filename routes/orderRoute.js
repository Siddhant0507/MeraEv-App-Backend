import express from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import {
  orderController,
  getMyOrdersController,
  allOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

// order Route
router.post("/create", isAuth, orderController);
router.get("/my-orders", isAuth, getMyOrdersController);
router.get("/all-orders", allOrdersController);
export default router;
