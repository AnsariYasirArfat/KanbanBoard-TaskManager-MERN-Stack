import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";
import {
  createTask,
  deleteTask,
  getTaskFromDataBase,
  updateTaskStatus,
  updatedTask,
} from "./services/taskServices";

function App() {
  const [filterText, setFilterText] = useState("");

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        await getTaskFromDataBase(setTodoTasks, setDoingTasks, setDoneTasks);
      } catch (error) {
        toast.error("Failed to get tasks", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    getTasks();
  }, []);

  // Function for adding task
  const addTodo = async (title, description) => {
    const taskData = {
      title,
      description,
    };
    try {
      const response = await createTask(taskData);

      if (response.success) {
        await getTaskFromDataBase(setTodoTasks, setDoingTasks, setDoneTasks);

        toast.success("New Task Added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Function for Deleting task
  const onDelete = async (task) => {
    try {
      const response = await deleteTask(task._id);
      if (response.success) {
        await getTaskFromDataBase(setTodoTasks, setDoingTasks, setDoneTasks);

        // For Notification Alert
        toast.error(`${response.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Function for editing task
  const onEdit = async (taskToUpdate) => {
    const updateTask = {
      ...taskToUpdate,
    };
    try {
      const response = await updatedTask(updateTask);

      if (response.success) {
        await getTaskFromDataBase(setTodoTasks, setDoingTasks, setDoneTasks);

        toast.info("Task Updated!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleDragEnd = async (result) => {
    const { destination, source } = result;
    console.log(result);
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const sourceStatus = source.droppableId;
    const destStatus = destination.droppableId;

    const sourceArray =
      sourceStatus === "TODO"
        ? todoTasks
        : sourceStatus === "DOING"
        ? doingTasks
        : doneTasks;
    const destArray =
      destStatus === "TODO"
        ? todoTasks
        : destStatus === "DOING"
        ? doingTasks
        : doneTasks;

    const [movedTask] = sourceArray.splice(source.index, 1);

    movedTask.status =
      destStatus === "TODO"
        ? "TODO"
        : destStatus === "DOING"
        ? "DOING"
        : "DONE";

    destArray.splice(destination.index, 0, movedTask);

    try {
      const response = await updateTaskStatus(movedTask);

      if (response.success) {
        setTodoTasks([...todoTasks]);
        setDoingTasks([...doingTasks]);
        setDoneTasks([...doneTasks]);
        // await getTaskFromDataBase(setTodoTasks, setDoingTasks, setDoneTasks);
        toast.success("Task status updated successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // To render on web page
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Header
          title="Kanban Board"
          addTodo={addTodo}
          filterText={filterText}
          onFilterTextChange={setFilterText}
        />
        <Todos
          todoTasks={todoTasks}
          doingTasks={doingTasks}
          doneTasks={doneTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          filterText={filterText}
        />
        <ToastContainer autoClose={1000} />
        <Footer />
      </DragDropContext>
    </>
  );
}

export default App;
