import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Collapse from "react-bootstrap/Collapse";
import { Draggable } from "react-beautiful-dnd";

const Todoitem = ({
  index,
  todo,
  onDelete,
  onEdit,
  HoveredOnBox,
  DescriptionState,
}) => {
  const [editing, setEditing] = useState(false);
  let todoItem;

  const MouseEnterBox = () => {
    HoveredOnBox(true);
  };

  const MouseLeaveBox = () => {
    HoveredOnBox(false);
  };

  // Alert after Editting task
  const onSave = () => {
    setEditing(false);
    toast.info("Task Updated!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // For condition Editting Todos
  if (editing) {
    todoItem = (
      <>
        <div
          onMouseUp={MouseEnterBox}
          onMouseDown={MouseLeaveBox}
          className="m-3 editBox taskBox taskBoxHeight uncheckedTaskBox "
        >
          <div className=" mx-4 my-1 d-flex justify-content-between align-items-center">
            <h5 className="m-0 saveHeading" style={{ color: "#0d6caf" }}>
              Edit Your Task:
            </h5>
            <button
              onClick={() => onSave()}
              className="btn btn-sm editDeleteButton my-1"
            >
              <img
                src="https://img.icons8.com/3d-fluency/94/null/save.png"
                alt="Save"
                width={30}
                className="me-1"
              />
              Save!
            </button>
          </div>
          <div className="p-1 mx-4 mb-3 editTitleInput">
            <input
              maxLength="50"
              className={`text p-1 mb-0 text-capitalize`}
              required
              value={todo.title}
              placeholder="No Title"
              onChange={(e) => {
                onEdit({
                  ...todo,
                  title: e.target.value,
                });
              }}
            />
          </div>
          <div className="editDescSection mx-4 p-1">
            <textarea
              className={`editDescInput p-1 text-capitalize`}
              value={todo.description}
              placeholder="No Description"
              onChange={(e) => {
                onEdit({
                  ...todo,
                  description: e.target.value,
                });
              }}
            ></textarea>
          </div>
        </div>
      </>
    );
  } else {
    todoItem = (
      <>
        <div
          onMouseEnter={MouseEnterBox}
          onMouseLeave={MouseLeaveBox}
          className={`m-3 taskBox d-flex flex-column justify-content-between${
            todo.status === "DONE" ? " doneTaskBox " : " undoneTaskBox"
          }  ${DescriptionState && "taskBoxHeight"}  `}
        >
          <div className="d-flex align-items-center p-3 taskTitleSection">
            <h5
              className={`m-0 taskTitle  ${
                todo.status === "DONE" && "taskChecked"
              } `}
            >
              {todo.title}
            </h5>
          </div>
          <Collapse in={DescriptionState}>
            <div
              className="taskDescSection mx-4 p-2"
              id="example-collapse-text"
            >
              <p
                className={`taskDesc  ${
                  todo.status === "DONE" && "taskChecked"
                }`}
              >
                {todo.description}
              </p>
              <small className="dateTime float-end">
                {new Date(todo.createdAt).toLocaleString()}
              </small>
            </div>
          </Collapse>
          <div className="mb-2">
            {!DescriptionState && (
              <div className="float-end mt-3 me-4">
                <small className="dateTime">
                  {new Date(todo.createdAt).toLocaleString()}
                </small>
              </div>
            )}
            <div className="float-start ms-4">
              {(todo.status === "DOING" || todo.status === "TODO") && (
                <button
                  onClick={() => setEditing(true)}
                  className="btn editDeleteButton btn-sm me-2"
                >
                  <img
                    src="https://img.icons8.com/3d-fluency/94/null/edit.png"
                    alt="Edit"
                    width={30}
                  />
                </button>
              )}
              <button
                className="btn editDeleteButton  btn-sm"
                onClick={() => onDelete(todo)}
              >
                <img
                  src="https://img.icons8.com/plasticine/100/null/filled-trash.png"
                  alt="Delete"
                  width={30}
                />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <Draggable draggableId={todo._id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`p-0  text-capitalize  ${
            snapshot.isDragging ? "dragTaskBox" : ""
          }`}
        >
          {todoItem}
        </div>
      )}
    </Draggable>
  );
};

export default Todoitem;
