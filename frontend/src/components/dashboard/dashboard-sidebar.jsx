import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BarChart3, FileSpreadsheet, Home, LineChart, LogOut, Settings, Upload, User } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Avatar, 
  AvatarFallback, 
  AvatarImage, 
  Button
} from "../ui"
// import { ModeToggle } from "@/components/mode-toggle"

export function DashboardSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-start px-4 py-2">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          <span className="text-xl font-bold">Excel Analytics</span>
        </div>
        <div className="mt-4 flex w-full items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Free Plan</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")} onClick={() => navigate("/dashboard")}>
              <div>
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/upload")} onClick={() => navigate("/dashboard/upload")}>
              <div>
                <Upload className="h-4 w-4" />
                <span>Upload Excel</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/files")} onClick={() => navigate("/dashboard/files")}>
              <div>
                <FileSpreadsheet className="h-4 w-4" />
                <span>My Files</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/charts")} onClick={() => navigate("/dashboard/charts")}>
              <div>
                <LineChart className="h-4 w-4" />
                <span>My Charts</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/profile")} onClick={() => navigate("/dashboard/profile")}>
              <div>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")} onClick={() => navigate("/dashboard/settings")}>
              <div>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between p-4">
        {/* <ModeToggle /> */}
        <Button variant="outline" size="icon">
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Log out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}