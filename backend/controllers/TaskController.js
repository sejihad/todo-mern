const TaskModel = require("../models/TaskModel");
const createTask = async (req, res) => {
  const data = req.body;
  try {
    const model = new TaskModel(data);
    await model.save();
    res.status(201).json({
      message: "Task added",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Faild to create task", success: false });
  }
};

const fetchAllTask = async (req, res) => {
  try {
    const data = await TaskModel.find({});

    res.status(200).json({
      message: "All Tasks",
      success: true,
      data,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Faild to showing All task", success: false });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    await TaskModel.findByIdAndUpdate(id, obj);
    res.status(200).json({
      message: "Update Task",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Faild to update task", success: false });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Task Deleted",
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Faild to delet task", success: false });
  }
};
module.exports = { createTask, fetchAllTask, updateTaskById, deleteTaskById };
