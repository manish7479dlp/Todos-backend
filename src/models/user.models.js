const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//define user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "firstName required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "lastName required"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "userName required"],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: [true, "email-id required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "password required"],
      trim: true,
    },
  },
  { timestamps: true }
);

//hash the password before saving the data into the database.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    this.password = await bcryptjs.hash(this.password, 10);
    next();
  }
});

//check the password isCorrect or not.
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

//generate the access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
    }
  );
};

const User = mongoose.model("user" , userSchema);

module.exports = User;
