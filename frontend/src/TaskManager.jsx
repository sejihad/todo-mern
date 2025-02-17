import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaPencilAlt,
  FaPlus,
  FaSearch,
  FaTrash,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTask, UpdateTaskById } from "./api";
import { notify } from "./utils";

const TaskManager = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState("");
  const [updateTask, setUpdateTask] = useState(null);

  const handleTask = () => {
    if (updateTask && input) {
      //upadte api call

      const obj = {
        taskName: input,
        isDone: updateTask.isDone,
        _id: updateTask._id,
      };
      handleUpdateItem(obj);
    } else if (updateTask === null && input) {
      //create api call
      handleAddTask();
    }
    setInput("");
  };

  useEffect(() => {
    if (updateTask) {
      setInput(updateTask.taskName);
    }
  }, [updateTask]);

  // add task
  const handleAddTask = async () => {
    const obj = {
      taskName: input,
      isDone: false,
    };
    try {
      const { success, message } = await CreateTask(obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      setInput("");
      fetchAllTask();
    } catch (error) {
      notify("Faild to create task", "error");
    }
  };

  // fetchAllTask
  const fetchAllTask = async () => {
    try {
      const { data } = await GetAllTask();
      setTasks(data);
      setCopyTasks(data);
    } catch (error) {
      console.log(error);
      notify("Faild to create task", "error");
    }
  };
  useEffect(() => {
    fetchAllTask();
  }, []);

  // delete task
  const handleDeleteTask = async (id) => {
    try {
      const { message, success } = await DeleteTaskById(id);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTask();
    } catch (error) {
      console.log(error);
      notify("Faild to create task", "error");
    }
  };

  // update task
  const handleCheckAndUncheck = async ({ _id, isDone, taskName }) => {
    const obj = {
      taskName,
      isDone: !isDone,
    };
    try {
      const { message, success } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTask();
    } catch (error) {
      console.log(error);
      notify("Faild to create task", "error");
    }
  };

  // update task
  const handleUpdateItem = async (item) => {
    const { _id, isDone, taskName } = item;
    const obj = {
      taskName,
      isDone: isDone,
    };
    try {
      const { success, message } = await UpdateTaskById(_id, obj);
      if (success) {
        //show success toast
        notify(message, "success");
      } else {
        //show error toast
        notify(message, "error");
      }
      fetchAllTask();
    } catch (err) {
      console.error(err);
      notify("Failed to create task", "error");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };
  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>

      {/* input and search box */}
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="form-control me-1"
            placeholder="Add a new Task"
          />
          <button onClick={handleTask} className="btn btn-success btn-sm me-2">
            <FaPlus className="m-2" />
          </button>
        </div>
        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            onChange={handleSearch}
            type="text"
            className="form-control "
            placeholder="Search tasks"
          />
        </div>
      </div>

      {/* List of items */}
      <div className="d-flex flex-column w-100">
        {tasks.map((item) => (
          <div
            key={item._id}
            className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center"
          >
            <span className={item.isDone ? "text-decoration-line-through" : ""}>
              {item.taskName}
            </span>
            <div className="">
              <button
                onClick={() => handleCheckAndUncheck(item)}
                className="btn btn-success btn-sm me-2"
                type="button"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => setUpdateTask(item)}
                className="btn btn-primary btn-sm me-2"
                type="button"
              >
                <FaPencilAlt />
              </button>
              <button
                onClick={() => {
                  handleDeleteTask(item._id);
                }}
                className="btn btn-danger btn-sm me-2"
                type="button"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  );
};

export default TaskManager;
