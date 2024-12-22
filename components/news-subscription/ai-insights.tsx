"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";
import { Button } from "../ui/button";
import AIIcon from "../icons/ai";
import { useNewsSearch } from "@/hooks/use-news-search";
import { useNewsPrompt } from "@/app/contexts/NewsPromptContext";
import { useState } from "react";
import { generateAIInsight } from "@/app/actions/ai/generate-ai-insight";
import { readStreamableValue } from "ai/rsc";
import { toast } from "@/hooks/use-toast";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Spinner from "../spinner";

export function AIInsights() {
  const { searchParams } = useSearchParams();
  const { data: searchResponse } = useNewsSearch(searchParams);
  const { newsPrompt } = useNewsPrompt();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string>("");

  const generate = async () => {
    setIsGenerating(true);

    if (searchResponse) {
      const content = await generateAIInsight({
        userPrompt: newsPrompt,
        newsResults: searchResponse,
      });

      let textContent = "";

      for await (const delta of readStreamableValue(content)) {
        textContent = `${textContent}${delta}`;
        setAiInsight(textContent);
      }
    } else {
      toast({
        title: "Please search the news first",
        variant: "destructive",
      });
    }
    setIsGenerating(false);
  };

  return (
    <div>
      <div className="mb-3 flex justify-between items-center">
        <h3 className="text-2xl text-gray-600">AI Action Results</h3>
        <Button disabled={!searchResponse || isGenerating} onClick={generate}>
          {isGenerating ? (
            <>
              <Spinner />
              Generating
            </>
          ) : (
            <>
              <AIIcon />
              Execute Your Prompt
            </>
          )}
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
          {!aiInsight && (
            <div className="text-sm text-muted-foreground">
              <h4 className="font-semibold">
                How to Generate AI-Powered Insights:
              </h4>
              <ol className="list-decimal pl-5">
                <li>
                  Enter <strong>keywords</strong> and your{" "}
                  <strong>Prompt</strong> in the search settings.
                </li>
                <li>
                  Click on <strong>Search News</strong> to retrieve the new
                  search results.
                </li>
                <li>
                  Finally, click <strong>Execute Your Prompt</strong> to get
                  AI-powered insights and analysis.
                </li>
              </ol>
            </div>
          )}
          <MarkdownPreview
            source={aiInsight}
            style={{ backgroundColor: "transparent", color: "black" }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
