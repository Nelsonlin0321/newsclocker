import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function LoadingNewsSubscription() {
  return (
    <div className="container mx-auto px-4 py-4">
      {/* Breadcrumb Loading */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-24" />
      </div>

      <div className="mt-8">
        {/* Header Loading */}
        <div className="px-4">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-2/3 mb-4" />
        </div>

        <div className="container mx-auto px-4 max-w-full space-y-2">
          {/* Settings Section Loading */}
          <div className="mb-1 flex justify-between items-center">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Form Loading */}
          <div className="space-y-4">
            {/* Name and Keywords */}
            <div className="grid gap-1 lg:grid-cols-[0.5fr,3fr]">
              <Skeleton className="h-[72px]" />
              <Skeleton className="h-[72px]" />
            </div>

            {/* Content Preferences and Delivery Settings */}
            <div className="grid gap-1 lg:grid-cols-2">
              <Card className="p-4 space-y-4">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </Card>

              <Card className="p-4 space-y-4">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="grid gap-4 md:grid-cols-2">
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </div>
              </Card>
            </div>

            {/* News Sources and Define Prompt */}
            <div className="grid gap-1 lg:grid-cols-2">
              <Card className="p-4 space-y-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-8 w-24" />
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-4 space-y-4">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-[150px] w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-40" />
                </div>
              </Card>
            </div>

            {/* Results Grid Loading */}
            <div className="grid lg:grid-cols-[1fr,1.3fr] gap-4">
              <div>
                <Card className="p-4">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="h-24 w-24" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="sticky top-24">
                <Card className="p-4">
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-[200px] w-full" />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}