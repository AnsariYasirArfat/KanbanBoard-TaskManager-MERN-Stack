import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Todos from "./components/Todos";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [filterText, setFilterText] = useState("");

  const [todoTasks, setTodoTasks] = useState([]);
  const [remainingTasks, setRemainingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    let storedTodoTasks = localStorage.getItem("todoTasks");
    if (storedTodoTasks) {
      storedTodoTasks = JSON.parse(storedTodoTasks);
      setTodoTasks(storedTodoTasks);
    }
    let storedRemainingTasks = localStorage.getItem("remainingTasks");
    if (storedRemainingTasks) {
      storedRemainingTasks = JSON.parse(storedRemainingTasks);
      setRemainingTasks(storedRemainingTasks);
    }

    let storedCompletedTasks = localStorage.getItem("completedTasks");
    if (storedCompletedTasks) {
      storedCompletedTasks = JSON.parse(storedCompletedTasks);
      setCompletedTasks(storedCompletedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
    localStorage.setItem("remainingTasks", JSON.stringify(remainingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [todoTasks, remainingTasks, completedTasks]);

  // Function for adding todo
  const addTodo = (title, desc) => {
    const myTodo = {
      sno: uuidv4(),
      title,
      desc,
      status: "TODO",
      done: false,
      todoTime: new Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      }).format(new Date()),
      todoDate: new Intl.DateTimeFormat(navigator.language, {
        // weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }).format(new Date()),
    };

    setTodoTasks([...todoTasks, myTodo]);

    // For Notification Alert
    toast.success("New Task Added!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Function for deleting todo
  const onDelete = (todo) => {
    setTodoTasks(todoTasks.filter((e) => e !== todo));
    setRemainingTasks(remainingTasks.filter((e) => e !== todo));
    setCompletedTasks(completedTasks.filter((e) => e !== todo));

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

    setRemainingTasks(
      remainingTasks.map((t) => (t.sno === editTodo.sno ? updatedTodo : t))
    );
    setTodoTasks(
      todoTasks.map((t) => (t.sno === editTodo.sno ? updatedTodo : t))
    );
  }

  // For checked task
  function onChecked(checkTodo) {
    const updatedTodo = {
      ...checkTodo,
    };
    let updatedRemainingTasks = [...remainingTasks];
    let updatedCompletedTasks = [...completedTasks];

    if (updatedTodo.done) {
      // Task is completed
      updatedRemainingTasks = updatedRemainingTasks.filter(
        (task) => task.sno !== checkTodo.sno
      );
      updatedCompletedTasks = [...updatedCompletedTasks, updatedTodo];
    } else {
      // Task is not completed
      updatedCompletedTasks = updatedCompletedTasks.filter(
        (task) => task.sno !== checkTodo.sno
      );
      updatedRemainingTasks = [...updatedRemainingTasks, updatedTodo];
    }

    setRemainingTasks(updatedRemainingTasks);
    setCompletedTasks(updatedCompletedTasks);
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
        ? remainingTasks
        : completedTasks;
    const destArray =
      destStatus === "todo"
        ? todoTasks
        : destStatus === "remain"
        ? remainingTasks
        : completedTasks;

    const [movedTask] = sourceArray.splice(source.index, 1);
    movedTask.done = destStatus === "completed";

    movedTask.status =
      destStatus === "todo"
        ? "TODO"
        : destStatus === "remain"
        ? "DOING"
        : "DONE";

    destArray.splice(destination.index, 0, movedTask);

    setTodoTasks([...todoTasks]);
    setRemainingTasks([...remainingTasks]);
    setCompletedTasks([...completedTasks]);
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
          remainingTasks={remainingTasks}
          completedTasks={completedTasks}
          onDelete={onDelete}
          onEdit={onEdit}
          onChecked={onChecked}
          filterText={filterText}
        />
        <ToastContainer autoClose={1000} />
        <Footer />
      </DragDropContext>
    </>
  );
}

export default App;
