import { Modal, Form } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";
import AlertModal from "./AlertModal";
import addTaskImg from "../assets/addTask.png";

const AddTodo = ({ addTodo }) => {
  // For Form Opening
  const [setshowForm, setShowForm] = useState(false);
  const openForm = () => setShowForm(true);

  // For Model
  const [showModal, setShowModal] = useState(false);

  // Title-Description & First capital letter
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [isHoveredOnButton, setIsHoveredOnButton] = useState(false);
  const mouseEnterButton = () => {
    setIsHoveredOnButton(true);
  };

  const mouseLeaveButtton = () => {
    setIsHoveredOnButton(false);
  };

  // On form submition
  const submit = (e) => {
    e.preventDefault();
    if (title) {
      addTodo(title, desc);
      setTitle("");
      setDesc("");
      setShowForm(false);
      return;
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="container p-4 text-center">
      {showModal && (
        <AlertModal show={showModal} onHide={() => setShowModal(false)} />
      )}

      <button
        onClick={openForm}
        className={`addTaskButton  d-flex justify-content-evenly align-items-center m-auto
          `}
        onMouseEnter={mouseEnterButton}
        onMouseLeave={mouseLeaveButtton}
      >
        {isHoveredOnButton && (
          <img src={addTaskImg} alt="search" width={30} className="" />
        )}
        <span className="">Add Task</span>
      </button>

      <Modal
        show={setshowForm}
        onHide={() => setShowForm(false)}
        centered
        style={{ backgroundColor: "#082837c0" }}
      >
        <Form className="addTaskForm" onSubmit={submit}>
          <Modal.Header closeButton>
            <Modal.Title className="addTask">AddTask</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="title" label="Todo Title!" className="">
              <Form.Control
                maxLength="50"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className=" mb-3 inputText text-capitalize"
                placeholder="Todo Title!"
                style={{ height: "60px", fontSize: "large" }}
              />
            </FloatingLabel>

            <FloatingLabel controlId="desc" label="Todo Description (Optional)">
              <Form.Control
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Description"
                className="mb-3 inputText text-capitalize"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="submit"
              className={`addTaskButton  d-flex justify-content-evenly align-items-center m-auto
            `}
              onMouseEnter={mouseEnterButton}
              onMouseLeave={mouseLeaveButtton}
            >
              {isHoveredOnButton && (
                <img src={addTaskImg} alt="search" width={30} className="" />
              )}
              <span className="">Add Task</span>
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTodo;
