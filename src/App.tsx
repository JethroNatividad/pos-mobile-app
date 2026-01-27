import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { NavLink } from "react-router";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 text-center">
      <h1 className="text-2xl font-bold">Welcome to Tauri + React</h1>

      <div className="flex gap-4 mt-4 mb-4">
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" className="size-10" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="size-10" alt="Tauri logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="size-10" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

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

      <form
        className="flex gap-2 justify-center mb-4 mt-4"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          className="border-b outline-none"
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button className="px-2 py-1 border rounded-md" type="submit">
          Greet
        </button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;
