//Wrapper for dashboard pages
import React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default DashboardLayout