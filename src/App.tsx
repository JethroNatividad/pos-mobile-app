import "./App.css";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { getUsers, User } from "./api/users";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };

    fetchUsers();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
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
          to="/setup"
          end
        >
          Setup
        </NavLink>
      </nav>

      {JSON.stringify(users)}

      <Button>Hello TEST</Button>
    </main>
  );
}

export default App;
