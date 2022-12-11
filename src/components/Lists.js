import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Lists({ todoData, setTodoData }) {
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

  const handleEnd = (result) => {
    if (!result.destination) return;

    const newTodoData = todoData;

    //변경할 아이템 배열에서 제거
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);

    //destination index 위치에 아이템 추가
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable key={data.id} draggableId={data.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${snapshot.isDragging ? "bg-gray-300" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-2 my-2 text-gray-600border rounded`}
                    >
                      <div className="items-center">
                        <input type="checkbox" onChange={() => handleCompleteChange(data.id)} defaultChecked={false} />{" "}
                        <span className={data.completed ? "line-through" : undefined}>{data.title} </span>
                      </div>
                      <div className="items-center">
                        <button onClick={() => handleClick(data.id)}>X</button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
