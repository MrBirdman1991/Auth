import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Home from "./pages/home/HomePage";

function Router() {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <header></header>
      <main className="min-h-screen flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  );
}

export default Router;
