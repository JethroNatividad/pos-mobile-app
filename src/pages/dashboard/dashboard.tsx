import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { getTodos, type Todo as TodoType } from "../../api/todos";
import CreateTodo from "./components/CreateTodo";
import Todo from "./components/Todo";

const Dashboard = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <div>Dashboard</div>
      <nav className="flex gap-4 mt-4 mb-4">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
          to="/"
          end
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500" : "text-black"
          }
          to="/dashboard"
          end
        >
          Dashboard
        </NavLink>
      </nav>
      <CreateTodo setTodos={setTodos} />
      <div className="w-full max-w-md mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Todo List</h2>
        {todos.length === 0 ? (
          <p>No todos found.</p>
        ) : (
          <div>
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} setTodos={setTodos} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
