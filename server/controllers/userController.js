const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const {
  createSuccessResponse,
  createErrorResponse,
} = require("../utils/utils");
const User = require("../models/userModel");
// const { sendOtpToMobile, generateOTP } = require("../utils/smsService")

// @desc    Auth user & get OTP
// @route   POST /api/v1/user/admin/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { mobileNo, password } = req.body;
  let existUser = null;
  existUser = await User.findOne({ mobileNo });
  const ismatch = await bcrypt.compare(password, existUser.password);

  if (!existUser) {
    createErrorResponse("", 400, "user not found");
  }
  if (ismatch) {
    createSuccessResponse(
      res,
      {
        token: generateToken(existUser._id),
        user: existUser,
      },
      200,
      "Login Success"
    );
  } else {
    res.status(400);
    throw new Error("password wrong");
  }
});
module.exports = {
  login,
};
