const Todos = require("../models/todos.models")


//create todos
const createTodos = async (req , res) => {
    try {
        const {title} = req.body

        if(!title) {
            return res.json({status: false , message: "title required"})
        }
         
        //create new todos document
        const todos = await Todos.create({
            title,
            createdBy: req?.user?._id,
        })

        if(todos) {
            return res.json({status: true , message: "todos created sucessfully"})
        }

        return res.json({status: false , message: "something went wrong"})

    } catch (error) {
        console.log("Error: ", error);
    }
}


module.exports = {createTodos}