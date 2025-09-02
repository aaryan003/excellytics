import React from "react";
import { BarChart3, LucideLineChart, MoreHorizontal, PieChartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";

// Sample data for recent charts
const recentCharts = [
  {
    id: "1",
    title: "Sales by Region",
    type: "bar",
    createdAt: "2 days ago",
    file: "Sales_Report_2023.xlsx",
    data: [
      { name: "North", value: 4000 },
      { name: "South", value: 3000 },
      { name: "East", value: 2000 },
      { name: "West", value: 2780 },
    ],
  },
  {
    id: "2",
    title: "Marketing ROI",
    type: "line",
    createdAt: "3 days ago",
    file: "Marketing_Data_Q1.xlsx",
    data: [
      { name: "Jan", value: 2400 },
      { name: "Feb", value: 1398 },
      { name: "Mar", value: 9800 },
      { name: "Apr", value: 3908 },
    ],
  },
  {
    id: "3",
    title: "Product Distribution",
    type: "pie",
    createdAt: "5 days ago",
    file: "Product_Inventory.xlsx",
    data: [
      { name: "Category A", value: 2400 },
      { name: "Category B", value: 4567 },
      { name: "Category C", value: 1398 },
      { name: "Category D", value: 9800 },
    ],
  },
  {
    id: "4",
    title: "Employee Satisfaction",
    type: "bar",
    createdAt: "1 week ago",
    file: "Employee_Survey.xlsx",
    data: [
      { name: "Q1", value: 3200 },
      { name: "Q2", value: 4500 },
      { name: "Q3", value: 3800 },
      { name: "Q4", value: 4300 },
    ],
  },
  {
    id: "5",
    title: "Revenue Growth",
    type: "line",
    createdAt: "2 weeks ago",
    file: "Financial_Projections.xlsx",
    data: [
      { name: "2020", value: 3200 },
      { name: "2021", value: 4500 },
      { name: "2022", value: 5800 },
      { name: "2023", value: 7300 },
    ],
  },
  {
    id: "6",
    title: "Customer Segments",
    type: "pie",
    createdAt: "3 weeks ago",
    file: "Customer_Feedback.xlsx",
    data: [
      { name: "Segment A", value: 4000 },
      { name: "Segment B", value: 3000 },
      { name: "Segment C", value: 2000 },
      { name: "Segment D", value: 1000 },
    ],
  },
];

function RecentChartsGrid({ showAll = false }) {
  const charts = showAll ? recentCharts : recentCharts.slice(0, 3);

  const getChartIcon = (type) => {
    switch (type) {
      case "bar":
        return <BarChart3 className="h-4 w-4" />;
      case "line":
        return <LucideLineChart className="h-4 w-4" />;
      case "pie":
        return <PieChartIcon className="h-4 w-4" />;
      default:
        return <BarChart3 className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {charts.map((chart) => (
        <Card key={chart.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b p-3">
              <div className="flex items-center gap-2">
                {getChartIcon(chart.type)}
                <span className="font-medium">{chart.title}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit Chart</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete Chart</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="h-[200px] p-4">
              {chart.type === "bar" && (
                <BarChart
                  data={chart.data}
                  index="name"
                  categories={["value"]}
                  colors={["hsl(var(--primary))"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  showLegend={false}
                  showXAxis={true}
                  showYAxis={true}
                  showGridLines={false}
                />
              )}
              {chart.type === "line" && (
                <LineChart
                  data={chart.data}
                  index="name"
                  categories={["value"]}
                  colors={["hsl(var(--primary))"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  showLegend={false}
                  showXAxis={true}
                  showYAxis={true}
                  showGridLines={false}
                />
              )}
              {chart.type === "pie" && (
                <PieChart
                  data={chart.data}
                  index="name"
                  categories={["value"]}
                  valueFormatter={(value) => `${value.toLocaleString()}`}
                  showLegend={false}
                />
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between border-t p-3 text-xs text-muted-foreground">
            <div>From: {chart.file}</div>
            <div>Created: {chart.createdAt}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default RecentChartsGrid;