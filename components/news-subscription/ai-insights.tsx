"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";
import { Button } from "../ui/button";
import AIIcon from "../icons/ai";
import { useNewsSearch } from "@/hooks/use-news-search";

export function AIInsights() {
  const { searchParams } = useSearchParams();
  const { data: searchResponse } = useNewsSearch(searchParams);
  const hasKeywords = searchParams.keywords.length > 0;

  return (
    <div>
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-2xl text-gray-600">AI Action Results</h3>
        <Button disabled={!searchResponse}>
          <AIIcon />
          Execute Your Prompt
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasKeywords ? (
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {searchResponse ? (
                  <>
                    Based on {searchResponse.news.length} articles found about
                    <span className="font-medium text-foreground">
                      {searchParams.keywords}
                    </span>
                    {", here are some insights:"}
                  </>
                ) : (
                  <>
                    {"Searching for articles about"}
                    <span className="font-medium text-foreground">
                      {searchParams.keywords}
                    </span>
                  </>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm">
                  • Trending topics related to your search
                </p>
                <p className="text-sm">• Key statistics and data points</p>
                <p className="text-sm">• Recent developments and updates</p>
                <p className="text-sm">• Expert opinions and analysis</p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              Enter keywords in the search settings to get AI-powered insights
              and analysis.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
