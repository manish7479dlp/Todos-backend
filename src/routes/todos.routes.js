const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middlewares")
const { createTodos, updateTitle } = require("../controllers/todos.controllers")
const router = express.Router()

//create todos route
router.post("/create" , verifyJWT , createTodos);

//update todos title route
router.patch("/update/title/:_id" , verifyJWT , updateTitle);


module.exports = router;