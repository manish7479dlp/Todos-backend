const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const Task = require("../models/task.models");
const Todos = require("../models/todos.models");
const apiResonse = require("../utility/apiResponse");

//create user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, password, userName, email } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "firstName required"));
    } else if (!lastName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "lastName required"));
    } else if (!password) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "password required"));
    } else if (!email) {
      return res.status(400).json(new apiResonse(400, null, "email required"));
    } else if (!userName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "userName required"));
    }
    const isExistingUser = await User.find({ userName });

    if (isExistingUser.length > 0) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "userName already exist"));
    }

    const user = await User.create({
      firstName,
      lastName,
      password,
      userName,
      email,
    });

    if (user) {
      return res
        .status(201)
        .json(new apiResonse(201, user, "user created sucessfully"));
    }
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(400, null, "error in create user controller", error)
      );
  }
};

//login user
const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "userName required"));
    } else if (!password) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "password required"));
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json(new apiResonse(400, null, "Invalid user"));
    }

    const isMatchPassword = await user.isPasswordCorrect(password);
    const isMatchUserName = user?.userName === userName;

    //check both password or userName match or not.
    if (isMatchPassword && isMatchUserName) {
      const token = user.generateAccessToken();

      return res
        .status(200)
        .json(
          new apiResonse(
            200,
            { user: user, accessToken: token },
            "login Sucessfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(
          new apiResonse(400, null, "something went wrong in login controller")
        );
    }
  } catch (error) {
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in login controller",
          error
        )
      );
  }
};

//update password
const updatePassword = async (req, res) => {
  try {
    const newPassword = req.body?.password;
    if (!newPassword) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "password required"));
    }

    const user = req?.user;

    user.password = newPassword;

    const respone = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResonse(200, respone, "password updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in updatePassword controller",
          error
        )
      );
  }
};

//update email
const updateEmail = async (req, res) => {
  try {
    const newEmail = req.body?.email;
    if (!newEmail) {
      return res.status(400).json(new apiResonse(400, null, "email required"));
    }

    const user = req?.user;

    user.email = newEmail;

    const respone = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResonse(200, respone, "email updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in updateEmail controller",
          error
        )
      );
  }
};

//update firstName
const updateFirstName = async (req, res) => {
  try {
    const firstName = req.body?.firstName;
    if (!firstName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "firstName required"));
    }

    const user = req?.user;

    user.firstName = firstName;

    const response = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResonse(200, response, "firstName updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in updateFirstName controller ",
          error
        )
      );
  }
};

//update lastName
const updateLastName = async (req, res) => {
  try {
    const lastName = req.body?.lastName;
    if (!lastName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "lastName required"));
    }

    const user = req?.user;

    user.lastName = lastName;

    const response = await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new apiResonse(200, response, "lastName updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in updateLastName controller ",
          error
        )
      );
  }
};

//Update user Details
const updateUserDetails = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "firstName required"));
    } else if (!lastName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "lastName required"));
    } else if (!password) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "password required"));
    } else if (!email) {
      return res.status(400).json(new apiResonse(400, null, "email required"));
    } else if (!userName) {
      return res
        .status(400)
        .json(new apiResonse(400, null, "userName required"));
    }

    const user = req?.user;

    (user.firstName = firstName),
      (user.lastName = lastName),
      (user.email = email);

    const response = await user.save({ validateBeforeSave: false });

    res.json({ status: true, message: "user details updated sucessfully" });
    return res
      .status(200)
      .json(new apiResonse(200, response, "user details updated sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in userDetailsUpdate controller ",
          error
        )
      );
  }
};

//Delete user
const deleteUser = async (req, res) => {
  try {
    const _id = req?.user._id;
    await Task.deleteMany({ createdBy: _id });
    await Todos.deleteMany({ createdBy: _id });
    await User.findByIdAndDelete(_id);

    res.json({ status: true, message: "User deleted sucessfully." });
    return res
      .status(200)
      .json(new apiResonse(200, null, "User deleted sucessfully"));
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in deleteUser controller ",
          error
        )
      );
  }
};

//get all user
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(new apiResonse(200, { users }, "success"));
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(400)
      .json(
        new apiResonse(
          400,
          null,
          "something went wrong in getAllUser controller ",
          error
        )
      );
  }
};

module.exports = {
  createUser,
  login,
  updateLastName,
  updateFirstName,
  updatePassword,
  updateEmail,
  updateUserDetails,
  deleteUser,
  getAllUser,
};
