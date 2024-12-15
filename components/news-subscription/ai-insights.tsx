"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";

export function AIInsights() {
  const { searchParams } = useSearchParams();
  const hasKeywords = searchParams.keywords.length > 0;

  return (
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
              Based on your search for{" "}
              <span className="font-medium text-foreground">
                &quot;{searchParams.keywords}&quot;
              </span>
              , here are some insights:
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
            Enter keywords in the search settings to get AI-powered insights and
            analysis.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
