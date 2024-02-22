const Todos = require("../models/todos.models");
const Task = require("../models/task.models");
const apiResponse = require("../utility/apiResponse");

//create todos
const createTodos = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json(new apiResponse(400, null, "title required"));
    }

    //create new todos document
    const todos = await Todos.create({
      title,
      createdBy: req?.user?._id,
    });

    if (todos) {
      return res
        .status(200)
        .json(new apiResponse(200, { todos }, "todos created sucessfully"));
    }

    return res
      .status(400)
      .json(new apiResponse(400, null, "todos not created"));
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in createTodo controller",
          error
        )
      );
  }
};

// update title
const updateTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const todosId = req.params._id;

    if (!todosId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "todos id required"));
    }

    if (!title) {
      return res.status(400).json(new apiResponse(400, null, "title required"));
    }

    const todos = await Todos.findById({ _id: todosId });

    if (!todos) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "Invalid todos id"));
    }

    const response = await Todos.findByIdAndUpdate(
      todosId,
      {
        $set: {
          title,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(200, { todos: response }, "title updated sucessfully")
      );
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wwrong in updateTodosTitle controller",
          error
        )
      );
  }
};

//get todos
const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todos.find();
    const responseArray = [];
    for (let i = 0; i < allTodos.length; i++) {
      const data = await findAllTaskOfGivenTodosId(allTodos[i]._id);
      const responseData = {
        title: allTodos[i].title,
        tasks: data,
      };
      responseArray.push(responseData);
    }

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { length: allTodos.length, todosList: responseArray.reverse() },
          "success"
        )
      );
  } catch (error) {
    console.log("Error: ", error);
    res.json({ status: false, error });
    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in getAllTodos controller",
          error
        )
      );
  }
};

//delete todos
const deleteTodos = async (req, res) => {
  try {
    const todosId = req?.params._id;
    if (!todosId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "todos id required"));
    }

    await Task.deleteMany({ parentId: todosId });
    await Todos.findByIdAndDelete(todosId);

    return res
      .status(200)
      .json(new apiResponse(200, null, "Todos deleted sucessfully"));
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(4400)
      .json(
        new apiResponse(
          400,
          null,
          "something wewnt wrong in deleteTodos controller",
          error
        )
      );
  }
};

// helper function of get todos controller
async function findAllTaskOfGivenTodosId(id) {
  try {
    const response = await Task.find({ parentId: id });
    return response;
  } catch (error) {
    console.log("Error in findAllTaskOfGivenTodosId(): ", error);
    return;
  }
}

module.exports = { createTodos, updateTitle, getAllTodos, deleteTodos };
