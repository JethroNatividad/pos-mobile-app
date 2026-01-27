import React from "react";
import { Todo as TodoType, updateTodo, deleteTodo } from "../../../api/todos";

type Props = {
  todo: TodoType;
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

const Todo = ({ todo, setTodos }: Props) => {
  const handleToggleStatus = async () => {
    const newStatus = todo.status === "PENDING" ? "DONE" : "PENDING";
    await updateTodo({ ...todo, status: newStatus });
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === todo.id ? { ...t, status: newStatus } : t,
      ),
    );
  };

  const handleDeleteTodo = async () => {
    await deleteTodo(todo.id);
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
  };

  return (
    <div className="flex justify-between border-b border-gray-300 py-2">
      <div
        onClick={handleToggleStatus}
        className={`${todo.status === "DONE" ? "line-through text-gray-500" : ""}`}
      >
        {todo.title}
      </div>
      <button className="text-red-500" onClick={handleDeleteTodo}>
        Delete
      </button>
    </div>
  );
};

export default Todo;
