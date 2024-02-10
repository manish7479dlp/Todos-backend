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

// update task
const updateTaskName = async (req , res) => {
    try {
        const {taskName} = req.body
        const taskId = req.params?._id

        if(!taskId) {
            return res.json({status: false , message: "task id resqured"})
        }

        if(!taskName) {
            return res.json({status: false , message: "taksName resqured"})
        }
        
        await Task.findByIdAndUpdate(taskId , {$set:{taskName}})
        

        
        return res.json({ status: true, message: "Task Name updated sucessfully" });

    } catch (error) {
        console.log("Error: " , error)
        res.json({status: false , error})
    }
}

//update task status
const updateTaskStatus = async (req , res) => {
    try {
        const taskId = req.params?._id
        const status = req.body?.status

        if(!taskId) {
            return res.json({status: false , message: "task id resqured"})
        }

        if(!status) {
            return res.json({status: false , message: "status  resqured"})
        }
        
        await Task.findByIdAndUpdate(taskId , {$set:{status}})
        
        
        return res.json({ status: true, message: "status of task updated sucessfully" });

    } catch (error) {
        console.log("Error: " , error)
        res.json({status: false , error})
    }
} 

module.exports = {addTask , updateTaskName , updateTaskStatus}