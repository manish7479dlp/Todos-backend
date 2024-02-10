const express = require("express")
const { verifyJWT } = require("../middlewares/auth.middlewares")
const { createTodos } = require("../controllers/todos.controllers")
const router = express.Router()

//create todos route
router.post("/create" , verifyJWT , createTodos);



module.exports = router;