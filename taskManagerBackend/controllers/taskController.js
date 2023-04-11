const Task = require("../models/Task");
const { getUser } = require("../middlewares/authMiddleware");

/* This code exports a function named `store` that handles the creation of a new task. It receives two
parameters, `req` and `res`, which represent the request and response objects respectively. */
module.exports.store = async (req, res) => {
  const { taskName, description, status, dueDate, priority } = req.body;

  try {
    const user = await getUser(req);
    // res.status(400).send({ user })
    if (user !== null) {
      const task = await Task.create({
        taskName,
        description,
        status: status.toLowerCase(),
        dueDate,
        priority: priority.toLowerCase(),
        userId: user._id,
      });
      res.status(201).json({
        task,
      });
    } else {
      res.status(400).send({
        error: ["User not found"],
      });
    }
  } catch (error) {
    res.status(422).send(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body);
    if (task) {
      const updatedTask = await Task.findById(task._id);
      return res.status(200).json({ task: updatedTask });
    } else {
      return res.status(404).json({
        errors: "Not found",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({
        errors: "Could not find task",
      });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.index = async (req, res) => {
  try {
    const user = await getUser(req);
    const { searchParam } = req.params;
    if (user !== null) {
      let query = req.query;
      let defaultValue = "all";
      if (query.priority !== undefined && query.priority === defaultValue) {
        delete query.priority;
      }
      if (query.dueDate !== undefined && query.dueDate === defaultValue) {
        delete query.dueDate;
      }
      if (query.status !== undefined && query.status === defaultValue) {
        delete query.status;
      }
      if (query.search !== undefined && query.search === "") {
        delete query.search;
      }

      query["userId"] = user._id;
      const tasks = await Task.find(
        query.search != undefined &&
          query.search.length > 0 &&
          query.search != ""
          ? {
              taskName: {
                $regex: query.search,
              },
            }
          : query
      );
      res.status(200).json({
        tasks,
      });
    } else {
      res.status(400).send({
        error: ["User not found"],
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.show = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (task) {
      res.status(200).json({
        task,
      });
    } else {
      res.status(404).json({
        errors: "Not found",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.search = async (req, res) => {
  try {
    const { searchParam } = req.params;
    const task = await Task.find({
      taskName: {
        $regex: searchParam,
      },
    });
    res.status(200).json({
      tasks: task,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.filter = async (req, res) => {
  // due date, priority, status

  try {
    const user = await getUser(req);
    let query = req.query;
    query["userId"] = user._id;

    const tasks = await Task.find(req.query);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).send(error);
  }
};
