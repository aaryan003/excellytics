import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/dashboard/Upload";
import Files from "./pages/dashboard/Files";
// import Charts from "./pages/dashboard/Charts";
// import Profile from "./pages/dashboard/Profile";
// import Settings from "./pages/dashboard/Settings";

// Admin pages
import {AdminDashboard} from "./components/admin/admin-dashboard";
// import Users from "./pages/admin/Users";
// import Analytics from "./pages/admin/Analytics";
// import Reports from "./pages/admin/Reports";
// import AdminSettings from "./pages/admin/AdminSettings";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Dashboard routes with sidebar layout */}
      <Route path="/dashboard" element={
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      } />
      <Route path="/dashboard/upload" element={
        <DashboardLayout>
          <Upload />
        </DashboardLayout>
      } />
       <Route path="/dashboard/files" element={
        <DashboardLayout>
          <Files />
        </DashboardLayout>
      } />
      {/*
      <Route path="/dashboard/charts" element={
        <DashboardLayout>
          <Charts />
        </DashboardLayout>
      } />
      <Route path="/dashboard/profile" element={
        <DashboardLayout>
          <Profile />
        </DashboardLayout>
      } />
      <Route path="/dashboard/settings" element={
        <DashboardLayout>
          <Settings />
        </DashboardLayout>
      } /> */}
      
      {/* Admin routes with admin layout */}
      <Route path="/admin" element={
        <AdminLayout>
          <AdminDashboard />
        </AdminLayout>
      } />
      {/* <Route path="/admin/users" element={
        <AdminLayout>
          <Users />
        </AdminLayout>
      } />
      <Route path="/admin/analytics" element={
        <AdminLayout>
          <Analytics />
        </AdminLayout>
      } />
      <Route path="/admin/reports" element={
        <AdminLayout>
          <Reports />
        </AdminLayout>
      } />
      <Route path="/admin/settings" element={
        <AdminLayout>
          <AdminSettings />
        </AdminLayout>
      } /> */}
    </Routes>
  );
};

export default App;