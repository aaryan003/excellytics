//Wrapper for Admin pages
import React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default AdminLayout