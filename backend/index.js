const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./config/db");
const PORT = process.env.PORT || 3000;
const TaskRouter = require("./routes/TaskRouter");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/tasks", TaskRouter);
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
