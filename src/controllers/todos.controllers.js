const Todos = require("../models/todos.models");
const Task = require("../models/task.models")

//create todos
const createTodos = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.json({ status: false, message: "title required" });
    }

    //create new todos document
    const todos = await Todos.create({
      title,
      createdBy: req?.user?._id,
    });

    if (todos) {
      return res.json({ status: true, message: "todos created sucessfully" });
    }

    return res.json({ status: false, message: "something went wrong" });
  } catch (error) {
    console.log("Error: ", error);
  }
};

// update title
const updateTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const todosId = req.params._id;

    if (!todosId) {
      return res.json({ status: false, message: "todos id required" });
    }

    if (!title) {
      return res.json({ status: false, message: "title required" });
    }

    const todos = await Todos.findById({_id: todosId});

    if (!todos) {
      return res.json({ status: false, message: "Invalid todos id" });
    }

    await Todos.findByIdAndUpdate(todosId, {
      $set: {
        title,
      },
    });

    return res.json({ status: true, message: "title updated sucessfully" });

  } catch (error) {
    console.log("Error: ", error);
  }
};

//get todos
const getAllTodos = async (req , res) => {
  try {
    const allTodos = await Todos.find()
    const response = []
    for(let i = 0; i < allTodos.length; i++) {
      const data = await findAllTaskOfGivenTodosId(allTodos[i]._id)
       response.push({Todos: allTodos[i], tasks: data})
    }
    res.json(response)
  } catch (error) {
    console.log("Error: ", error)
    res.json({status: false , error})
  }
}

//delete todos
const deleteTodos = async (req , res) => {
  try {
    const todosId = req?.params._id;
    if(!todosId) {
      res.json({status: false , message: "todos id required"})
      return
    }

    await Task.deleteMany({parentId: todosId})
    await Todos.findByIdAndDelete(todosId);

    res.send({status: true , message: "Todos deleted sucessfully"})

  } catch (error) {
    console.log("Error: ", error)
    res.json({status: false , error})
  }
}


// helper function of get todos controller
async function  findAllTaskOfGivenTodosId(id) {
  try {
    const response = await Task.find({parentId:id})
    return response
  } catch (error) {
    console.log("Error in findAllTaskOfGivenTodosId(): ", error)
    return;
  }
}



module.exports = { createTodos, updateTitle , getAllTodos , deleteTodos};
