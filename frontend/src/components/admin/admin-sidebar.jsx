import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BarChart3, Home, LineChart, LogOut, Settings, Shield, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-start px-4 py-2">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
        <div className="mt-4 flex w-full items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Admin User</span>
            <span className="text-xs text-muted-foreground">Administrator</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin")} onClick={() => navigate("/admin")}>
              <div>
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/users")} onClick={() => navigate("/admin/users")}>
              <div>
                <Users className="h-4 w-4" />
                <span>User Management</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/analytics")} onClick={() => navigate("/admin/analytics")}>
              <div>
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/reports")} onClick={() => navigate("/admin/reports")}>
              <div>
                <LineChart className="h-4 w-4" />
                <span>Reports</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/admin/settings")} onClick={() => navigate("/admin/settings")}>
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