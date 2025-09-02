import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function UsageStats() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Storage Usage</div>
          <div className="text-sm text-muted-foreground">128 MB of 500 MB</div>
        </div>
        <Progress value={25.6} />
        <div className="text-xs text-muted-foreground">
          Your storage usage is within limits. You can upgrade your plan for more storage.
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">File Uploads</div>
          <div className="text-sm text-muted-foreground">24 of 50 files</div>
        </div>
        <Progress value={48} />
        <div className="text-xs text-muted-foreground">You can upload 26 more files this month.</div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">AI Analysis Credits</div>
          <div className="text-sm text-muted-foreground">8 of 20 used</div>
        </div>
        <Progress value={40} />
        <div className="text-xs text-muted-foreground">You have 12 AI analysis credits remaining this month.</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Plan</div>
            <div className="mt-1 text-2xl font-bold">Free</div>
            <div className="mt-2 text-xs text-muted-foreground">
              Upgrade to Pro for unlimited uploads, 2GB storage, and advanced analytics.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm font-medium">Account Since</div>
            <div className="mt-1 text-2xl font-bold">May 2023</div>
            <div className="mt-2 text-xs text-muted-foreground">
              You've been with us for 12 months. Thank you for your support!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// If you prefer default export instead of named export
export default UsageStats;