const express = require("express")
const cors = require("cors")
const app = express();

//middleware

app.use(express.json());

//to enable cross origin resouce sharing 
app.use(cors());



// route import

const userRoute = require("./routes/user.routes")
const todosRoute = require("./routes/todos.routes")
const taskRoute = require("./routes/task.routes")

app.use("/api/v1/user",userRoute)
app.use("/api/v1/todos",todosRoute)
app.use("/api/v1/task",taskRoute)

app.get("/" , (req , res) => {
    res.send("hlw from the other side..")
})

app.get("*" , (req , res) => {
  res.send("invalid routes")
})






module.exports = {app}