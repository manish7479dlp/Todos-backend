const dotenv = require("dotenv")
//config dotenv
dotenv.config({
    path: "./.env"
});
const connectDb = require("./db/connectDb")
const {app} = require("./app")

const port = process.env.PORT || 8000

connectDb().then(() => {
    app.listen(port , () => {
        console.log(`Server is running at port : ${port}`)
    })
}).catch((error) => {
    console.log("Mongodb connection failed.", error)
})