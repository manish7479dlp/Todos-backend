const express = require("express");
const { verifyJWT } = require("../middlewares/auth.middlewares");
const { addTask, updateTaskName, updateTaskStatus } = require("../controllers/task.controllers");
const router = express.Router();

//add task 
router.post("/add/:_id", verifyJWT , addTask)

//update task name 
router.patch("/update/task-name/:_id", verifyJWT , updateTaskName)

//update task status
router.patch("/update/status/:_id",verifyJWT , updateTaskStatus)

module.exports = router