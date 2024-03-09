import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "email must be unique"],
    },
    phoneNumber: {
      type: String,
      required: [true, "phone number is required"],
      unique: [true, "email must be unique"],
      minLength: [10, "phoneNumber must be 10 digits long"],
    },
  },
  { timestamps: true }
);

// // hash function for phoneNumber and email
// userSchema.pre("save", async function () {
//   this.email = await bcrypt.hash(this.email, 10);
//   this.phoneNumber = await bcrypt.hash(this.phoneNumber, 10);
// });

// // decrypt function
// userSchema.methods.comparePhoneNumber = async function (plainPhoneNumber) {
//   return await bcrypt.compare(plainPhoneNumber, this.phoneNumber);
// };

//jwt token
userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const userModel = mongoose.model("User", userSchema);
export default userModel;
