import React, { useState } from "react"
import { ArrowUpRight, BarChart3, Download, FileSpreadsheet, LineChart, PieChart, Plus, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecentUploadsTable from "@/components/dashboard/recent-uploads-table"
import RecentChartsGrid from "@/components/dashboard/recent-charts-grid";
import { UsageStats } from "@/components/dashboard/usage-stats"
import { SidebarTrigger } from "@/components/ui/sidebar"

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <SidebarTrigger className="mr-2" />
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload Excel
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="uploads">Uploads</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                  <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+3 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Charts Created</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-muted-foreground">+12 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128 MB</div>
                  <p className="text-xs text-muted-foreground">of 500 MB (25.6%)</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Insights</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>Your most recently uploaded Excel files</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentUploadsTable />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("uploads")}>
                    View All Uploads
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Chart Types</CardTitle>
                  <CardDescription>Distribution of your created charts</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-6">
                  <div className="flex h-[240px] w-[240px] flex-col items-center justify-center rounded-full border-8 border-primary/10">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <span className="text-xl font-bold">42%</span>
                      </div>
                      <span className="text-sm text-muted-foreground">Bar Charts</span>
                    </div>
                    <div className="my-3 h-px w-1/2 bg-border" />
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <LineChart className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">28%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Line</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <PieChart className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">18%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Pie</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">8%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Area</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-medium">4%</span>
                        </div>
                        <span className="text-xs text-muted-foreground">Other</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Charts</CardTitle>
                  <CardDescription>Your most recently created charts and visualizations</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentChartsGrid />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="ml-auto" onClick={() => setActiveTab("charts")}>
                    View All Charts
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="uploads" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Uploads</CardTitle>
                  <CardDescription>Manage all your uploaded Excel files</CardDescription>
                </div>
                <Button size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New
                </Button>
              </CardHeader>
              <CardContent>
                <RecentUploadsTable showAll />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="charts" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Charts</CardTitle>
                  <CardDescription>View and manage all your created charts</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Chart
                </Button>
              </CardHeader>
              <CardContent>
                <RecentChartsGrid showAll />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="usage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Statistics</CardTitle>
                <CardDescription>Monitor your platform usage and limits</CardDescription>
              </CardHeader>
              <CardContent>
                <UsageStats />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default Dashboard