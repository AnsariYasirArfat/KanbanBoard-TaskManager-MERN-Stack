import React, { useState } from "react";
import TodoItem from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

const Todos = (props) => {
  let myStyle = {
    minHeight: "70vh",
  };

  const [isHoveredOnBox, setIsHoveredOnBox] = useState(false);
  const [open, setOpen] = useState(true);

  let filteredTodoTasks = props.todoTasks;
  let filteredDoingTasks = props.doingTasks;
  let filteredDoneTasks = props.doneTasks;

  if (props.filterText) {
    filteredTodoTasks = props.todoTasks.filter(
      (todo) =>
        todo.title.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
    );
    filteredDoingTasks = props.doingTasks.filter(
      (todo) =>
        todo.title.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
    );
    filteredDoneTasks = props.doneTasks.filter(
      (todo) =>
        todo.title.toLowerCase().indexOf(props.filterText.toLowerCase()) !== -1
    );
  }

  return (
    <div className="mx-4 mt-4 " style={myStyle}>
      <div className="m-3 d-flex align-items-center justify-content-center">
        <h6 className="mb-0 descripStatus me-3">Description:</h6>
        <div className="descripStatusBox px-2 pb-1">
          <label className="me-3  radio-label">
            <input
              type="radio"
              value="show"
              checked={open}
              onChange={() => setOpen(true)}
              aria-controls="example-collapse-text"
              aria-checked={open}
            />
            <span className="radio-custom me-2"></span>
            Show
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="hide"
              checked={!open}
              onChange={() => setOpen(false)}
              aria-controls="example-collapse-text"
              aria-checked={!open}
            />
            <span className="radio-custom me-2"></span>
            Hide
          </label>
        </div>
      </div>

      <div className={`row ${isHoveredOnBox && "blur"}`}>
        {/* Todo tasks Section */}
        <div className="col-xl-4 d-flex flex-column my-4">
          <p className="subHeading fw-bold text-center ">
            To Do:
            <span className="count"> {filteredTodoTasks.length}</span>
          </p>
          <Droppable droppableId={`TODO`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${
                  snapshot.isDraggingOver ? "dragTaskContainer" : ""
                } row row-cols-md-2 row-cols-xl-1 overflow-auto tasksContainer `}
              >
                {filteredTodoTasks.length === 0 ? (
                  <h5 className="text-center p-auto emptyTask">
                    No To Do Task Here!
                  </h5>
                ) : (
                  <>
                    {filteredTodoTasks.map((todo, index) => {
                      return (
                        <TodoItem
                          index={index}
                          todo={todo}
                          key={`todo-${todo._id}`}
                          onDelete={props.onDelete}
                          onEdit={props.onEdit}
                          HoveredOnBox={setIsHoveredOnBox}
                          DescriptionState={open}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </>
                )}
              </div>
            )}
          </Droppable>
        </div>
        {/* Remaining tasks Section  */}
        <div className="col-xl-4 d-flex flex-column my-4">
          <p className="subHeading fw-bold text-center ">
            Doing:
            <span className="count"> {filteredDoingTasks.length}</span>
          </p>
          <Droppable droppableId={`DOING`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${
                  snapshot.isDraggingOver ? "dragTaskContainer" : ""
                } row row-cols-md-2 row-cols-xl-1  overflow-auto tasksContainer `}
              >
                {filteredDoingTasks.length === 0 ? (
                  <h5 className="text-center emptyTask">No Doing Task Here!</h5>
                ) : (
                  <>
                    {filteredDoingTasks.map((todo, index) => {
                      return (
                        <TodoItem
                          index={index}
                          todo={todo}
                          key={`todo-${todo._id}`}
                          onDelete={props.onDelete}
                          onEdit={props.onEdit}
                          HoveredOnBox={setIsHoveredOnBox}
                          DescriptionState={open}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </>
                )}
              </div>
            )}
          </Droppable>
        </div>
        {/* Completed tasks Section */}
        <div className="col-xl-4 d-flex flex-column my-4 ">
          <p className="subHeading fw-bold text-center ">
            Done:
            <span className="count"> {filteredDoneTasks.length}</span>
          </p>
          <Droppable droppableId={`DONE`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`${
                  snapshot.isDraggingOver ? "dragTaskContainer" : ""
                } row row-cols-md-2 row-cols-xl-1 overflow-auto tasksContainer `}
              >
                {filteredDoneTasks.length === 0 ? (
                  <h5 className="text-center emptyTask">No Done Task Here!</h5>
                ) : (
                  <>
                    {filteredDoneTasks.map((todo, index) => {
                      return (
                        <TodoItem
                          index={index}
                          todo={todo}
                          key={`todo-${todo._id}`}
                          onDelete={props.onDelete}
                          onEdit={props.onEdit}
                          HoveredOnBox={setIsHoveredOnBox}
                          DescriptionState={open}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </div>
  );
};

export default Todos;
