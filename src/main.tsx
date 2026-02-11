import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter, Routes, Route } from "react-router";
import Setup from "@/pages/auth/setup";
import Login from "@/pages/auth/login";
import AuthGuard from "@/components/AuthGuard";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/setup" element={<Setup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<AuthGuard />}>
          <Route path="/" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
