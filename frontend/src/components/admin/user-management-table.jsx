import React from "react";
import { MoreHorizontal } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Sample data for users
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    plan: "Free",
    status: "Active",
    files: 24,
    storage: "128 MB",
    joinedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    plan: "Pro",
    status: "Active",
    files: 56,
    storage: "450 MB",
    joinedAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    plan: "Free",
    status: "Inactive",
    files: 12,
    storage: "64 MB",
    joinedAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    plan: "Pro",
    status: "Active",
    files: 78,
    storage: "820 MB",
    joinedAt: new Date("2023-01-05"),
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    plan: "Free",
    status: "Active",
    files: 8,
    storage: "42 MB",
    joinedAt: new Date("2023-04-25"),
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    plan: "Pro",
    status: "Active",
    files: 112,
    storage: "1.2 GB",
    joinedAt: new Date("2022-11-15"),
  },
];

function UserManagementTable({ showAll = false }) {
  const displayUsers = showAll ? users : users.slice(0, 4);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Files</TableHead>
          <TableHead>Storage</TableHead>
          <TableHead>Joined</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant={user.plan === "Pro" ? "default" : "outline"}>{user.plan}</Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "Active" ? "outline" : "secondary"}
                className={
                  user.status === "Active" ? "border-green-500 text-green-500" : "border-gray-500 text-gray-500"
                }
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.files}</TableCell>
            <TableCell>{user.storage}</TableCell>
            <TableCell>{formatDistanceToNow(user.joinedAt, { addSuffix: true })}</TableCell>
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
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                  <DropdownMenuItem>View Files</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserManagementTable;
