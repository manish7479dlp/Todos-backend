const express = require("express")
const route = express.Router();

const {createUser, login} = require("../controllers/user.controllers")

//create user route
route.post("/create" , createUser);

// login route
route.post("/login" , login)


module.exports = route;