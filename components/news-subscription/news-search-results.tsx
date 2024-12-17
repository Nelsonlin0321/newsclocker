"use client";
import { searchNews } from "@/app/actions/search/search-news";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSearchParams from "@/hooks/use-search-params";
import { toast } from "@/hooks/use-toast";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useQuery } from "@tanstack/react-query";

export function NewsSearchResults() {
  const { searchParams } = useSearchParams();
  const {
    data: searchResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["search-news", searchParams],
    queryFn: () => searchNews(searchParams),
    gcTime: 1 * 60 * 1000,
  });

  if (error) {
    toast({
      title: "Error",
      description: "Error fetching news results. Please try again later.",
      variant: "destructive",
    });
  }

  return (
    <div className="flex flex-col">
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-2xl text-gray-600">Search Result</h3>
      </div>

      <Card>
        <ScrollArea className="min-h-28 max-h-[calc(100vh-10rem)] overflow-scroll">
          {isLoading ? (
            <div className="grid gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <Skeleton className="w-24 h-24" />
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-6 mb-2" />
                        <Skeleton className="h-4 mb-2" />
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Skeleton className="h-4 w-1/4" />
                          {/* <span>•</span> */}
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <>
              {searchResponse && searchResponse.news.length > 0 ? (
                <div className="grid gap-4">
                  {searchResponse.news.map((result, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {result.imageUrl && (
                            <img
                              src={result.imageUrl}
                              alt={result.title}
                              className="w-24 h-24 object-cover rounded-md"
                              loading="lazy"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <a
                              href={result.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-lg font-semibold hover:text-primary line-clamp-2 mb-2"
                            >
                              {result.title}
                            </a>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {result.snippet}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-medium">
                                {result.source}
                              </span>
                              <span>•</span>
                              <span>{result.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No results found.</p>
              )}
            </>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
}
