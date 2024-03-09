import express from "express";
import {
  getUserProfileController,
  loginController,
  logoutController,
  registerController,
  updateProfileController,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { rateLimit } from "express-rate-limit";

//rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const router = express.Router();

//register or Signup route
router.post("/register", limiter, registerController);

// Signin route
router.post("/login", limiter, loginController);

//profile route
router.get("/profile", isAuth, getUserProfileController);

// logout route
router.get("/logout", isAuth, logoutController);

//update Profile
router.put("/profile-update", isAuth, updateProfileController);

export default router;
