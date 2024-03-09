import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    if (!name || !email || !phoneNumber) {
      res.status(500).send({
        message: "required fields are not porvided",
        success: false,
      });
    }

    // check existing user
    const existingUser = await userModel.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(500).send({
        message: "User Already exist.Please Login",
        success: false,
      });
    }

    //on success of registration
    const user = await userModel.create({ name, email, phoneNumber });
    res.status(201).send({
      message: "user Created Successfully",
      success: true,
      user,
    });
  } catch (error) {
    //on error of registration
    res.status(500).send({
      message: "error at user registration in controller api",
      success: false,
      error,
    });
    console.log("error at user Registeration controller api ", error);
  }
};

//
////////////// Login Controller ///////////////////////////////
//
export const loginController = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    if (!phoneNumber) {
      res.status(500).send({
        message: "Please Provide the Phone Number",
        success: false,
      });
    }
    // check phoneNumber if user is new or existing
    const user = await userModel.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).send({
        message: "User Not Found",
        success: false,
        user,
      });
    }

    // jwt token
    const token = user.generateToken();
    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        message: "Login SuccessFully",
        success: true,
        token,
        user,
      });
  } catch (error) {
    res.status(500).send({
      message: "error at user sign in controller part",
      success: false,
      error,
    });
    console.log("error at user signin controller ", error);
  }
};

/////////// User Profile controller ///////////////////////////

export const getUserProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).send({
      success: true,
      message: "User Profile Fetch Successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message: "error at userProfile controller part",
      success: false,
      error,
    });
    console.log("error at userProfile controller ", error);
  }
};

/////////////// Logout controller //////////////////////

export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .send({
        success: true,
        message: "User Logout successfully",
      });
  } catch (error) {
    res.status(500).send({
      message: "error at Logout controller part",
      success: false,
      error,
    });
    console.log("error at Logout controller ", error);
  }
};

/////////////////// Profile Update ///////////////////////////

export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const { name, email, phoneNumber } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    await user.save();
    res.status(200).send({
      success: true,
      message: "User Update successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "error at UpdateProfile controller part",
      success: false,
      error,
    });
    console.log("error at UpdateProfile controller ", error);
  }
};
