import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function PlatformStats() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Active Users</div>
            <div className="mt-1 text-2xl font-bold">112 / 128</div>
            <div className="mt-2">
              <Progress value={87.5} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">87.5% of users are active this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Pro Plan Users</div>
            <div className="mt-1 text-2xl font-bold">42 / 128</div>
            <div className="mt-2">
              <Progress value={32.8} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">32.8% of users are on the Pro plan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Storage Utilization</div>
            <div className="mt-1 text-2xl font-bold">8.2 GB / 20 GB</div>
            <div className="mt-2">
              <Progress value={41} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">41% of total allocated storage is used</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">AI Analysis Usage</div>
            <div className="mt-1 text-2xl font-bold">256 / 500</div>
            <div className="mt-2">
              <Progress value={51.2} />
            </div>
            <div className="mt-2 text-xs text-muted-foreground">51.2% of AI analysis credits used this month</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">User Retention</div>
            <div className="mt-1 text-2xl font-bold">92%</div>
            <div className="mt-2 text-xs text-muted-foreground">92% of users from last month are still active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Average Files Per User</div>
            <div className="mt-1 text-2xl font-bold">8</div>
            <div className="mt-2 text-xs text-muted-foreground">Users upload an average of 8 files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Average Charts Per File</div>
            <div className="mt-1 text-2xl font-bold">2</div>
            <div className="mt-2 text-xs text-muted-foreground">Users create an average of 2 charts per file</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Platform Uptime</div>
            <div className="mt-1 text-2xl font-bold">99.98%</div>
            <div className="mt-2 text-xs text-muted-foreground">Platform has been reliable with 99.98% uptime</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PlatformStats;