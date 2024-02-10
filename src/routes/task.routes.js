const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middlewares");
const { addTask } = require("../controllers/task.controllers");
const router = express.Router();

//add task 
router.post("/add/:_id", verifyJWT , addTask)

module.exports = router