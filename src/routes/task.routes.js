const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middlewares");
const { addTask, updateTaskName } = require("../controllers/task.controllers");
const router = express.Router();

//add task 
router.post("/add/:_id", verifyJWT , addTask)

//update task name 
router.patch("/update/task-name/:_id", verifyJWT , updateTaskName)

module.exports = router