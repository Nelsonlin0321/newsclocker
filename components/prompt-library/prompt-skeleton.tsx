import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PromptSkeleton = () => {
  return (
    <Card className="group relative hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-1/2" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 mt-4 justify-between">
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptSkeleton;
