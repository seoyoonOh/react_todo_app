import React, { useState } from "react";

const List = React.memo(({ key, id, title, completed, todoData, setTodoData, provided, snapshot }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };
  const handleClick = (id) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };
  const handleEditChange = (event) => {
    setEditedTitle(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.title = editedTitle;
      }
      return data;
    });
    setTodoData(newTodoData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center justify-between w-full px-4 py-2 my-2 bg-gray-100 text-gray-600 border rounded">
        <div className="items-center">
          <form onSubmit={handleSubmit}>
            <input value={editedTitle} className="w-full px-3 py-2 mr-4 text-gray-500 rounded" onChange={handleEditChange} />
          </form>
        </div>
        <div className="items-center">
          <button className="px-4 py-2" onClick={handleSubmit}>
            save
          </button>
          <button className="px-4 py-2" onClick={() => setIsEditing(false)}>
            X
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={key}
        {...provided.draggableProps}
        ref={provided.innerRef}
        {...provided.dragHandleProps}
        className={`${snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600border rounded`}
      >
        <div className="items-center">
          <input type="checkbox" onChange={() => handleCompleteChange(id)} defaultChecked={false} />{" "}
          <span className={completed ? "line-through" : undefined}>{title} </span>
        </div>
        <div className="items-center">
          <button className="px-4 py-2" onClick={() => setIsEditing(true)}>
            edit
          </button>
          <button className="px-4 py-2" onClick={() => handleClick(id)}>
            X
          </button>
        </div>
      </div>
    );
  }
});

export default List;
