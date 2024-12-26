import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const SubscriptionCardSkeleton = (props: Props) => {
  return (
    <Card className="card relative">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2 py-3"
        id="card-header"
      >
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent id="card-content" className="py-3">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              {/* <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Keywords
              </h4> */}
              <div className="flex flex-wrap gap-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            </div>

            <div>
              {/* <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Frequency
              </h4> */}
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          <div>
            {/* <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Next Send Time
            </h4> */}
            <div className="flex items-center text-sm">
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
};

export default SubscriptionCardSkeleton;
