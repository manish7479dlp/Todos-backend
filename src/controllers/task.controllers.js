const Task = require("../models/task.models")
const Todos = require("../models/todos.models")


// add task
const addTask = async (req , res) => {
    try {
        const {taskName} = req.body
        const todosId = req.params?._id

        if(!todosId) {
            return res.json({status: false , message: "todos id resqured"})
        }

        if(!taskName) {
            return res.json({status: false , message: "taksName resqured"})
        }

        const todos = await Todos.findById({_id: todosId});

        if (!todos) {
          return res.json({ status: false, message: "Invalid todos id" });
        }

        const task = await Task.create({
             taskName,
             createdBy: req?.user?._id,
             parentId: todosId
        })

        if(!task) {
          return res.json({ status: false, message: "something went wrong in addTask controller" });    
        }
        
        return res.json({ status: true, message: "Task added sucessfully" });

    } catch (error) {
        console.log("Error: " , error)
        res.json({status: false , error})
    }
}

module.exports = {addTask}