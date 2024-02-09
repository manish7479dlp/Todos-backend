const express = require("express")
const router = express.Router();

const {createUser, login} = require("../controllers/user.controllers")

//create user route
router.post("/create" , createUser);

// login route
router.post("/login" , login)


module.exports = router;