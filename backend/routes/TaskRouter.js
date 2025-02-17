const {
  createTask,
  fetchAllTask,
  deleteTaskById,
  updateTaskById,
} = require("../controllers/TaskController");

const router = require("express").Router();

//get all task
router.get("/", fetchAllTask);
//create task
router.post("/", createTask);
//update task
router.put("/:id", updateTaskById);
//delete a task
router.delete("/:id", deleteTaskById);
module.exports = router;
