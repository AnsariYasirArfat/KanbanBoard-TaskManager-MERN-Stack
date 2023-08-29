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
  onChecked,
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

  // Alert after completing task
  const checkedBox = () => {
    if (todo.done === false) {
      toast("Task Completed!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast("Task Reassigned!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
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
              value={todo.desc}
              placeholder="No Description"
              onChange={(e) => {
                onEdit({
                  ...todo,
                  desc: e.target.value,
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
            todo.done === true ? " checkedTaskBox " : " uncheckedTaskBox"
          }  ${DescriptionState && "taskBoxHeight"}  `}
        >
          <div className="d-flex align-items-center p-3 taskTitleSection">
            {todo.status === "DOING" || todo.status === "DONE" ? (
              <input
                className="me-3"
                type="checkbox"
                checked={todo.done}
                onChange={(e) => {
                  onChecked({
                    ...todo,
                    done: e.target.checked,
                  });
                  checkedBox();
                }}
              />
            ) : (
              ""
            )}
            <h5
              className={`m-0 taskTitle  ${
                todo.done === true && "taskChecked"
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
              <p className={`taskDesc  ${todo.done === true && "taskChecked"}`}>
                {todo.desc}
              </p>
              <small className="dateTime float-end">
                {todo.todoDate + " at " + todo.todoTime}
              </small>
            </div>
          </Collapse>
          <div className="mb-2">
            {!DescriptionState && (
              <div className="float-end mt-3 me-4">
                <small className="dateTime">
                  {todo.todoDate + " at " + todo.todoTime}
                </small>
              </div>
            )}
            <div className="float-start ms-4">
              {todo.done === false && (
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
    <Draggable draggableId={todo.sno.toString()} index={index}>
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
