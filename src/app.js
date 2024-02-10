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


// // log all endpoints
// function print(path, layer) {
//     if (layer.route) {
//       layer.route.stack.forEach(
//         print.bind(null, path.concat(split(layer.route.path)))
//       );
//     } else if (layer.name === "router" && layer.handle.stack) {
//       layer.handle.stack.forEach(
//         print.bind(null, path.concat(split(layer.regexp)))
//       );
//     } else if (layer.method) {
//       console.log(
//         "%s /%s",
//         layer.method.toUpperCase(),
//         path.concat(split(layer.regexp)).filter(Boolean).join("/")
//       );
//     }
//   }
  
//   function split(thing) {
//     if (typeof thing === "string") {
//       return thing.split("/");
//     } else if (thing.fast_slash) {
//       return "";
//     } else {
//       var match = thing
//         .toString()
//         .replace("\\/?", "")
//         .replace("(?=\\/|$)", "$")
//         .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
//       return match
//         ? match[1].replace(/\\(.)/g, "$1").split("/")
//         : "<complex:" + thing.toString() + ">";
//     }
//   }
  
//   app._router.stack.forEach(print.bind(null, []));



module.exports = {app}