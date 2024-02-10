const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const apiResponse = require("../utility/apiResponse");

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.header("authorization")?.replace("Bearer", "");

    if (!token) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "unauthorized User"));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "Invalid Credential"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error:", error);
    res.send(error);
    return res
    .status(400)
    .json(new apiResponse(400, null, "Something went wrong in verifyJWT auth",error));
  }
};

module.exports = { verifyJWT };
