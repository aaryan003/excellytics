import React from "react";
import { FileSpreadsheet, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Sample data for recent uploads
const recentUploads = [
  {
    id: "1",
    name: "Sales_Report_2023.xlsx",
    size: "2.4 MB",
    uploadedAt: new Date("2023-05-01"),
    status: "Analyzed",
    charts: 5,
  },
  {
    id: "2",
    name: "Marketing_Data_Q1.xlsx",
    size: "1.8 MB",
    uploadedAt: new Date("2023-04-28"),
    status: "Analyzed",
    charts: 3,
  },
  {
    id: "3",
    name: "Customer_Feedback.xlsx",
    size: "3.2 MB",
    uploadedAt: new Date("2023-04-25"),
    status: "Analyzing",
    charts: 0,
  },
  {
    id: "4",
    name: "Product_Inventory.xlsx",
    size: "4.7 MB",
    uploadedAt: new Date("2023-04-20"),
    status: "Analyzed",
    charts: 7,
  },
  {
    id: "5",
    name: "Employee_Survey.xlsx",
    size: "1.2 MB",
    uploadedAt: new Date("2023-04-15"),
    status: "Analyzed",
    charts: 2,
  },
  {
    id: "6",
    name: "Financial_Projections.xlsx",
    size: "2.9 MB",
    uploadedAt: new Date("2023-04-10"),
    status: "Failed",
    charts: 0,
  },
];

function RecentUploadsTable({ showAll = false }) {
  const uploads = showAll ? recentUploads : recentUploads.slice(0, 4);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Uploaded</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Charts</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {uploads.map((upload) => (
          <TableRow key={upload.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                {upload.name}
              </div>
            </TableCell>
            <TableCell>{upload.size}</TableCell>
            <TableCell>{formatDistanceToNow(upload.uploadedAt, { addSuffix: true })}</TableCell>
            <TableCell>
              <Badge
                variant={
                  upload.status === "Analyzed" ? "default" : upload.status === "Analyzing" ? "outline" : "destructive"
                }
              >
                {upload.status}
              </Badge>
            </TableCell>
            <TableCell>{upload.charts}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Create Chart</DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default RecentUploadsTable;