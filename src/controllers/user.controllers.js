const User = require("../models/user.models");
const bcryptjs = require("bcryptjs");

//create user
const createUser = async (req, res) => {
  try {
    const [firstName, lastName, password, userName, email] = req.body;

    if (!firstName) {
      res.json({ status: false, message: "firstName required" });
    } else if (!lastName) {
      res.json({ status: false, message: "lastName required" });
    } else if (!password) {
      res.json({ status: false, message: "password required" });
    } else if (!email) {
      res.json({ status: false, message: "email required" });
    } else if(!userName) {
      res.json({ status: false, message: "userName required" });
    }

    const isExistingUser = await find({ userName });

    if (isExistingUser) {
      res.json({ status: false, message: "userName already exits" });
    }

    const user = await new User.create({
      firstName,
      lastName,
      password,
      userName,
      email,
    });

    if (user) {
      res
        .status(201)
        .json({ status: true, message: "user created sucessfully" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//login user
const login = async (req, res) => {
  try {
    const [userName, password] = req.body;

    if (!userName) {
      res.json({ status: false, message: "userName required" });
    } else if (!password) {
      res.json({ status: false, message: "password required" });
    }

    const isMatchPassword = User.isPasswordCorrect(password);
    const isMatchUserName = req?.user?.userName === userName;

    if (isMatchPassword && isMatchUserName) {
      const token = User.generateAccessToken();
      res
        .status(200)
        .json({
          status: true,
          message: "login Sucessfully",
          accessToken: token,
          user: req?.user,
        });
    } else {
      res.json({ status: false, message: "Invalid user" });
    }
  } catch (error) {
    console.log("Error", error);
  }
};

//update password
const updatePassword = async (req, res) => {
  try {
    const newPassword = req.body?.password;
    if (!newPassword) {
      res.json({ status: false, message: "password required" });
    }

    const user = req?.user;

    user.password = await bcryptjs.hash(newPassword, 10);

    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("Error", error);
  }
};

//update email
const updateEmail = async (req, res) => {
  try {
    const newEmail = req.body?.email;
    if (!newEmail) {
      res.json({ status: false, message: "email required" });
    }

    const user = req?.user;

    user.email = newEmail;

    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("Error", error);
  }
};

//update firstName
const updateFirstName = async (req, res) => {
  try {
    const firstName = req.body?.email;
    if (!firstName) {
      res.json({ status: false, message: "firstName required" });
    }

    const user = req?.user;

    user.firstName = firstName;

    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("Error", error);
  }
};

//update lastName
const updateLastName = async (req, res) => {
  try {
    const lastName = req.body?.email;
    if (!lastName) {
      res.json({ status: false, message: "lastName required" });
    }

    const user = req?.user;

    user.lastName = lastName;

    await user.save({ validateBeforeSave: false });
  } catch (error) {
    console.log("Error", error);
  }
};

//Update user Details
const updateUserDetails = async (req, res) => {
  try {
    const [firstName, lastName, email] = req.body;

    if (!firstName) {
      res.json({ status: false, message: "firstName required" });
    } else if (!lastName) {
      res.json({ status: false, message: "lastName required" });
    } else if (!email) {
      res.json({ status: false, message: "email required" });
    }

    const user = req.body?.user;

    (user.firstName = firstName),
      (user.lastName = lastName),
      (user.email = email),
      await user.save({ validateBeforeSave: false });

      res.json({status: true , message: "user details updated sucessfully"})

  } catch (error) {
    console.log("Error", error);
  }
};
