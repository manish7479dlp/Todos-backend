const express = require("express")
const cors = require("cors")
const app = express();

//middleware

app.use(express.json());

//to enable cross origin resouce sharing 
app.use(cors());



// route import

const userRoute = require("./routes/user.routes")


app.use("/api/v1/user",userRoute)



module.exports = {app}