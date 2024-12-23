"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";
import { Button } from "../ui/button";
import AIIcon from "../icons/ai";
import { useNewsSearch } from "@/hooks/use-news-search";
import { useNewsPrompt } from "@/app/contexts/NewsPromptContext";
import { useEffect, useRef, useState } from "react";
import { generateAIInsight } from "@/app/actions/ai/generate-ai-insight";
import { readStreamableValue } from "ai/rsc";
import { toast } from "@/hooks/use-toast";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Spinner from "../spinner";
import { ScrollArea } from "../ui/scroll-area";
import pdfIcon from "@/public/pdf.jpg";
import pdfDownloadIcon from "@/public/pdf-download.svg";
import Image from "next/image";
import { getPdfUrl } from "@/app/actions/pdf/get-pdf-url";
import Link from "next/link";

export function AIInsights() {
  const { searchParams } = useSearchParams();
  const { data: searchResponse } = useNewsSearch(searchParams);
  const { newsPrompt } = useNewsPrompt();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string>("");

  const generate = async () => {
    setIsGenerating(true);
    setPdfUrl("");
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

  const markdownRef = useRef<HTMLDivElement>(null); // Create a ref for the MarkdownPreview

  useEffect(() => {
    if (markdownRef.current) {
      markdownRef.current.scrollTop = markdownRef.current.scrollHeight; // Scroll to the bottom
    }
  }, [aiInsight]); // Effect runs when aiInsight changes

  const [pdfUrl, setPdfUrl] = useState("");
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const generatePdfUrl = async () => {
    setGeneratingPdf(true);
    const response = await getPdfUrl({
      markdown: aiInsight,
      keywords: searchParams.keywords,
    });
    setPdfUrl(response);
    setGeneratingPdf(false);
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
          <CardTitle className="flex items-center gap-2 justify-between">
            <div className="flex flex-row gap-2 items-center">
              <Sparkles className="h-5 w-5 text-primary" />
              <p>AI Insights</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={"outline"}
                disabled={!searchResponse || isGenerating || !aiInsight}
                onClick={async () => {
                  await generatePdfUrl();
                }}
              >
                {generatingPdf ? <Spinner /> : "Generate"}
                <Image src={pdfIcon} alt="Generate" width={20} height={20} />
              </Button>

              {!generatingPdf && pdfUrl && (
                <Link href={pdfUrl}>
                  <Button variant={"outline"}>
                    {"Download"}
                    <Image
                      src={pdfDownloadIcon}
                      alt="Download"
                      width={20}
                      height={20}
                    />
                  </Button>
                </Link>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea
            className="min-h-28 max-h-[calc(100vh-15rem)] overflow-scroll"
            ref={markdownRef}
          >
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
                    Click <strong>Execute Your Prompt</strong> to get AI-powered
                    insights and analysis.
                  </li>
                  <li>
                    Finally, Click <strong>Generate PDF</strong> and{" "}
                    <strong>Download PDF</strong> to get AI-powered insights
                    report and analysis.
                  </li>
                </ol>
              </div>
            )}
            {aiInsight && (
              <MarkdownPreview
                source={aiInsight}
                style={{ backgroundColor: "transparent", color: "black" }}
              />
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
