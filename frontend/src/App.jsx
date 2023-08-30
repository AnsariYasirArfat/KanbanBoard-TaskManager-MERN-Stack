import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import { DragDropContext } from "react-beautiful-dnd";
import axios from "axios";

function App() {
  const [filterText, setFilterText] = useState("");

  const [todoTasks, setTodoTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    async function getTaskFromDataBase() {
      try {
        const response = await axios.get(`http://localhost:8000/api/tasks/`);
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
      } catch (error) {
        console.log("Error get tasks: ", error);
        toast.error("Failed to get tasks", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
    getTaskFromDataBase();
  }, []);

  // Function for adding todo
  const addTodo = async (title, description) => {
    const myTodo = {
      title,
      description,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/tasks/create",
        myTodo
      );
      if (response.data.success) {
        toast.success("New Task Added!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error(`${error.response.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Function for deleting todo
  const onDelete = (todo) => {
    setTodoTasks(todoTasks.filter((e) => e !== todo));
    setDoingTasks(doingTasks.filter((e) => e !== todo));
    setDoneTasks(doneTasks.filter((e) => e !== todo));

    // For Notification Alert
    toast.error("Task Deleted!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Function for editing todo
  function onEdit(editTodo) {
    const updatedTodo = {
      ...editTodo,
      todoTime: new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date()),
      todoDate: new Intl.DateTimeFormat(navigator.language, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    };

    setDoingTasks(
      doingTasks.map((t) => (t._id === editTodo._id ? updatedTodo : t))
    );
    setTodoTasks(
      todoTasks.map((t) => (t._id === editTodo._id ? updatedTodo : t))
    );
  }

  const handleDragEnd = (result) => {
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
      sourceStatus === "todo"
        ? todoTasks
        : sourceStatus === "remain"
        ? doingTasks
        : doneTasks;
    const destArray =
      destStatus === "todo"
        ? todoTasks
        : destStatus === "remain"
        ? doingTasks
        : doneTasks;

    const [movedTask] = sourceArray.splice(source.index, 1);

    movedTask.status =
      destStatus === "todo"
        ? "TODO"
        : destStatus === "remain"
        ? "DOING"
        : "DONE";

    destArray.splice(destination.index, 0, movedTask);

    setTodoTasks([...todoTasks]);
    setDoingTasks([...doingTasks]);
    setDoneTasks([...doneTasks]);

    toast.success("Task status updated successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
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
