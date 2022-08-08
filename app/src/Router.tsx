import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Dashboard from "./pages/dashboard/DashboardPage";
import Home from "./pages/home/HomePage";
import RequireAuth from "./components/auth/RequireAuth";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*Protected Route */}
        <Route element={<RequireAuth/>}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default Router;
