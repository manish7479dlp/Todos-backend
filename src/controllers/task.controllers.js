const Task = require("../models/task.models");
const Todos = require("../models/todos.models");
const apiResponse = require("../utility/apiResponse")
// add task
const addTask = async (req, res) => {
  try {
    const { taskName } = req.body;
    const todosId = req.params?._id;

    if (!todosId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "todos id resqured"));
    }

    if (!taskName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "taksName resqured"));
    }

    const todos = await Todos.findById({ _id: todosId });

    if (!todos) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "Invalid todos id"));
    }

    const task = await Task.create({
      taskName,
      createdBy: req?.user?._id,
      parentId: todosId,
    });

    if (!task) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "Task is not added sucessfully"));
    }

    return res
      .status(200)
      .json(new apiResponse(200, { task }, "Task added sucessfully"));
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          null,
          "something went wrong in crateTask controller",
          error
        )
      );
  }
};

// update task
const updateTaskName = async (req, res) => {
  try {
    const { taskName } = req.body;
    const taskId = req.params?._id;

    if (!taskId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "task id required"));
    }

    if (!taskName) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "taksName required"));
    }

    const response = await Task.findByIdAndUpdate(
      taskId,
      { $set: { taskName } },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { task: response },
          "Task Name updated sucessfully"
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
          "something went wrong in updateTaskName controller",
          error
        )
      );
  }
};

//update task status
const updateTaskStatus = async (req, res) => {
  try {
    const taskId = req.params?._id;
    const status = req.body?.status;

    if (!taskId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "task id required"));
    }

    if (!status) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "status field required"));
    }

    const response = await Task.findByIdAndUpdate(
      taskId,
      { $set: { status } },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          { task: response },
          "status of task updated sucessfully"
        )
      );
  } catch (error) {
    console.log("Error: ", error);

    return res
      .status(400)
      .json(
        new apiResponse(
          400,
          null,
          "something went wrong in updateStatus controller",
          error
        )
      );
  }
};

//delete task
const deleteTask = async (req, res) => {
  try {
    const taskId = req?.params?._id;

    if (!taskId) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "task id required"));
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(400)
        .json(new apiResponse(400, null, "invalid task id"));
    }

    await Task.findByIdAndDelete(taskId);
    return res
        .status(200)
        .json(new apiResponse(200, null, "Task deleted sucessfully"));
  } catch (error) {
    console.log("Error: ", error);
    return res
        .status(400)
        .json(new apiResponse(400, null, "something went wrong in deleteTask controller",error));
  }
};

module.exports = { addTask, updateTaskName, updateTaskStatus, deleteTask };
