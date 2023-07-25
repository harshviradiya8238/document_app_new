const mongoose = require("mongoose");
const { encrypt } = require("../utils/cryptoService");
const bcrypt = require("bcryptjs");
const { async } = require("@firebase/util");

const saltRounds = 10;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      default: "Jennypoint User",
    },
    mobileNo: { type: Number, required: true },
    password: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// Check if the user already exists

User.findOne({ mobileNo: 9999999999 }, async (error, existingUser) => {
  if (error) {
    console.error(error);
  } else {
    if (!existingUser) {
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHash = await bcrypt.hash("admin@123", salt);
      const user = new User({
        name: "Admin User",
        mobileNo: 9999999999,
        password: passwordHash,
      });
      user.save((error, savedUser) => {
        if (error) {
          console.error(error);
        } else {
          console.log("User saved:", savedUser);
        }
      });
    }
  }
});

module.exports = User;
