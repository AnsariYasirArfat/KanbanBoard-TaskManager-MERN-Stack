import Task from "../models/task.model.js";

/**********************************************************
 * @CREATE_TASK
 * @route POST /api/tasks/create
 * @description Controller used for creating a new task
 * @returns Newly created Task Object with success message
 *********************************************************/
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      throw new Error("Please provide at least title to create task");
    }
    const task = await Task.create({
      title,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**********************************************************
 * @UPDATE_TASK
 * @route PUT /api/tasks/:id
 * @description Controller used for updating an existing task
 * @returns Updated Task Object with success message
 *********************************************************/
export const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id: taskId } = req.params;
    if (!title) {
      throw new Error("Please provide at least title to update the task");
    }

    const updateTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      updateTask,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**********************************************************
 * @DELETE_TASK
 * @route DELETE /api/tasks/:id
 * @description Controller used for deleting a task
 * @returns Success message if task is deleted
 *********************************************************/
export const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const taskToDelete = await Task.findOneAndDelete(taskId);
    if (!taskToDelete) {
      throw new Error("Task not found to delete");
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**********************************************************
 * @GET_ALL_TASKS
 * @route GET /api/tasks
 * @description Controller used for fetching all tasks
 * @returns Array of Task Objects if tasks are found
 *********************************************************/
export const getAllTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks || tasks.length === 0) {
      throw new Error("Tasks not found");
    }
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
