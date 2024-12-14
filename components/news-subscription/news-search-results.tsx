"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIIcon from "@/components/icons/ai";
import useSearchParams from "@/hooks/use-search-params";
import { NewsSearchResultResponse } from "@/app/types/search";
interface NewsSearchResultsProps {
  NewsSearchResponse: NewsSearchResultResponse;
}

export function NewsSearchResults({
  NewsSearchResponse,
}: NewsSearchResultsProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-2xl text-gray-600">Search Result</h3>
        <Button>
          <AIIcon />
          Execute Your Prompt
        </Button>
      </div>
      <div className="grid gap-4">
        {NewsSearchResponse.news.map((result, index) => (
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
                    <span className="font-medium">{result.source}</span>
                    <span>•</span>
                    <span>{result.date}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
