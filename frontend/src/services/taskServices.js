import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

/**********************************************************
 * @GET_TASKS
 * @description Retrieve tasks from the API and categorize them
 * @param {function} setTodoTasks - Function to set TODO tasks
 * @param {function} setDoingTasks - Function to set DOING tasks
 * @param {function} setDoneTasks - Function to set DONE tasks
 * @returns {Promise} Resolves with categorized task data
 **********************************************************/
export const getTaskFromDataBase = async (
  setTodoTasks,
  setDoingTasks,
  setDoneTasks
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`);
    const allTasks = response.data.tasks;
    const todoTask = allTasks.filter((task) => task.status === "TODO");
    const doingTasks = allTasks.filter((task) => task.status === "DOING");
    const doneTasks = allTasks.filter((task) => task.status === "DONE");

    // console.log(allTasks[0]._id);
    setTodoTasks(todoTask);
    console.log(todoTask);

    setDoingTasks(doingTasks);
    console.log(doingTasks);

    setDoneTasks(doneTasks);
    console.log(doneTasks);
    // return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @CREATE_TASK
 * @description Create a new task
 * @param {object} taskData - Data for the new task
 * @returns Response data from the API
 **********************************************************/
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/create`, taskData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @DELETE_TASK
 * @description Delete a task by ID
 * @param {string} taskId - ID of the task to delete
 * @returns Response data from the API
 **********************************************************/
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @UPDATE_TASK
 * @description Update a task
 * @param {object} updateTask - Updated task data
 * @returns Response data from the API
 **********************************************************/
export const updatedTask = async (updateTask) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${updateTask._id}`,
      updateTask
    );

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

/**********************************************************
 * @UPDATE_TASK_STATUS
 * @description Update the status of a task
 * @param {object} Task - Task object to be updated
 * @returns Response data from the API
 **********************************************************/
export const updateTaskStatus = async (Task) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/tasks/${Task._id}/status`,
      { status: Task.status }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
