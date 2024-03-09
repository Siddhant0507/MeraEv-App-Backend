import Jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized Access",
    });
  }
  const decodeData = Jwt.decode(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData._id);
  next();
};
