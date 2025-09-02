import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {AuthProvider} from '@/context/AuthContext.jsx';
import { BrowserRouter } from "react-router-dom";
import { SidebarProvider } from "./components/ui/sidebar.jsx"; // ✅ import fixed


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
        <App />
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
