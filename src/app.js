const express = require("express")
const cors = require("cors")
const app = express();

//middleware

app.use(express.json());

//to enable cross origin resouce sharing 
app.use(cors());

app.get("/" , (req , res) => {
    res.send("hlw from the other side..")
})

// route import

const userRoute = require("./routes/user.routes")
const todosRoute = require("./routes/todos.routes")


app.use("/api/v1/user",userRoute)
app.use("/api/v1/todos",todosRoute)



module.exports = {app}