import React from 'react'
import { useState } from "react"
import { BarChart3, Download, FileSpreadsheet, LineChart, Users } from "lucide-react"
import { Chart as BarChart } from "@/components/ui/chart"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import UserManagementTable from "@/components/admin/user-management-table"
import PlatformStats from "@/components/admin/platform-stats"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold md:text-2xl">Admin Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="mr-2 h-4 w-4" />
              Export Reports
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,024</div>
                  <p className="text-xs text-muted-foreground">+256 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Charts</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,048</div>
                  <p className="text-xs text-muted-foreground">+512 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2 GB</div>
                  <p className="text-xs text-muted-foreground">+1.4 GB from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Recently registered users on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <UserManagementTable />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("users")}>
                    View All Users
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Platform Usage</CardTitle>
                  <CardDescription>Weekly platform activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <BarChart
                      data={[
                        { name: "Mon", value: 120 },
                        { name: "Tue", value: 180 },
                        { name: "Wed", value: 240 },
                        { name: "Thu", value: 280 },
                        { name: "Fri", value: 320 },
                        { name: "Sat", value: 160 },
                        { name: "Sun", value: 100 },
                      ]}
                      index="name"
                      categories={["value"]}
                      colors={["hsl(var(--primary))"]}
                      valueFormatter={(value) => `${value} users`}
                      showLegend={false}
                      showXAxis={true}
                      showYAxis={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Platform Statistics</CardTitle>
                  <CardDescription>Detailed platform usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <PlatformStats />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <UserManagementTable showAll />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Detailed analytics about platform usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-lg font-medium">User Growth</h3>
                    <div className="h-[300px]">
                      <BarChart
                        data={[
                          { name: "Jan", value: 50 },
                          { name: "Feb", value: 68 },
                          { name: "Mar", value: 82 },
                          { name: "Apr", value: 96 },
                          { name: "May", value: 128 },
                        ]}
                        index="name"
                        categories={["value"]}
                        colors={["hsl(var(--primary))"]}
                        valueFormatter={(value) => `${value} users`}
                        showLegend={false}
                        showXAxis={true}
                        showYAxis={true}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4 text-lg font-medium">File Uploads</h3>
                    <div className="h-[300px]">
                      <BarChart
                        data={[
                          { name: "Jan", value: 320 },
                          { name: "Feb", value: 480 },
                          { name: "Mar", value: 640 },
                          { name: "Apr", value: 820 },
                          { name: "May", value: 1024 },
                        ]}
                        index="name"
                        categories={["value"]}
                        colors={["hsl(var(--primary))"]}
                        valueFormatter={(value) => `${value} files`}
                        showLegend={false}
                        showXAxis={true}
                        showYAxis={true}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}