"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Mail, Send } from "lucide-react";
import useSearchParams from "@/hooks/use-search-params";
import { Button } from "../ui/button";
import AIIcon from "../icons/ai";
import { useNewsSearch } from "@/hooks/use-news-search";
import { useNewsPrompt } from "@/app/contexts/NewsPromptContext";
import { useEffect, useRef, useState } from "react";
import { generateAIInsight } from "@/app/actions/ai/generate-ai-insight";
import { readStreamableValue } from "ai/rsc";
import { toast } from "react-hot-toast";
import MarkdownPreview from "@uiw/react-markdown-preview";
import Spinner from "../spinner";
import { ScrollArea } from "../ui/scroll-area";
import pdfIcon from "@/public/pdf.jpg";
import pdfDownloadIcon from "@/public/pdf-download.svg";
import Image from "next/image";
import { getPdfUrl } from "@/app/actions/pdf/get-pdf-url";
import Link from "next/link";
import "./ai-insights.css";
import { Skeleton } from "@/components/ui/skeleton";
import { deliverMail } from "@/app/actions/mail/deliver-mai";
import { useParams } from "next/navigation";
import GoogleSearchIcon from "@/public/google-search-icon.png";

export function AIInsights() {
  const { searchParams } = useSearchParams();
  const { data: searchResponse } = useNewsSearch(searchParams);
  const { newsPrompt } = useNewsPrompt();
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [aiInsight, setAiInsight] = useState<string>("");
  const [isDelivering, setIsDelivering] = useState<boolean>(false);
  const params = useParams();

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
      toast.error("Please search the news first");
    }
    setIsGenerating(false);
  };

  const markdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (markdownRef.current) {
      markdownRef.current.scrollTop = markdownRef.current.scrollHeight;
    }
  }, [aiInsight]);

  const [pdfUrl, setPdfUrl] = useState("");
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const generatePdfUrl = async () => {
    setGeneratingPdf(true);
    const response = await getPdfUrl({
      markdown: aiInsight,
      title: searchParams.keywords,
    });
    setPdfUrl(response);
    setGeneratingPdf(false);
  };

  const handleDeliverMail = async () => {
    if (!searchResponse || !aiInsight || !pdfUrl) {
      toast.error("Please generate insights and PDF first");
      return;
    }

    const subscriptionId = params.id as string;
    if (!subscriptionId) {
      toast.error("Subscription ID not found");
      return;
    }

    setIsDelivering(true);
    try {
      const response = await deliverMail(
        subscriptionId,
        aiInsight,
        pdfUrl,
        searchResponse
      );
      if (response.status === "success") {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0 pt-0.5">
                  <Send className="text-green-600" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">Mail Sent</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Lett check AI-insight Mailbox!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <Link
                href={`/mail/${subscriptionId}/${response.mailId}`}
                target="_blank"
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <button onClick={() => toast.dismiss(t.id)}>Check</button>
              </Link>
            </div>
          </div>
        ));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to deliver mail");
    } finally {
      setIsDelivering(false);
    }
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

              {!generatingPdf && pdfUrl ? (
                <>
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
                  <Button
                    variant="outline"
                    onClick={handleDeliverMail}
                    disabled={isDelivering}
                  >
                    {isDelivering ? (
                      <>
                        <Spinner />
                        Delivering
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Deliver to Mail
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant={"outline"} disabled={true}>
                    {"Download"}
                    <Image
                      src={pdfDownloadIcon}
                      alt="Download"
                      width={20}
                      height={20}
                    />
                  </Button>
                  <Button variant="outline" disabled={true}>
                    {
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Deliver to Mail
                      </>
                    }
                  </Button>
                </>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea
            className="min-h-28 max-h-[calc(100vh-20rem)] overflow-scroll"
            ref={markdownRef}
          >
            {!aiInsight && !isGenerating && (
              <div className="text-md text-muted-foreground pb-5">
                <h4 className="font-semibold pb-5 text-black">
                  How to tailor your AI insight report generation and
                  subscription:
                </h4>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    Enter <strong>keywords</strong> and your{" "}
                    <strong>Prompt</strong> in the search settings.
                  </li>
                  <li>
                    Click on{" "}
                    <Button variant={"outline"} disabled={true}>
                      <Image
                        src={GoogleSearchIcon}
                        alt={"GoogleSearchIcon"}
                        // height={40}
                        // width={40}
                        className="mr-2 h-8 w-8"
                      />
                      Search News
                    </Button>
                    to retrieve the new search results.
                  </li>
                  <li>
                    Click{" "}
                    <Button disabled={true}>
                      <AIIcon />
                      Execute Your Prompt
                    </Button>{" "}
                    to get AI-powered insights and analysis.
                  </li>
                  <li>
                    Click{" "}
                    <Button variant={"outline"} disabled={true}>
                      Generate
                      <Image
                        src={pdfIcon}
                        alt="Generate"
                        width={20}
                        height={20}
                      />
                    </Button>{" "}
                    and{" "}
                    <Button variant={"outline"} disabled={true}>
                      {"Download"}
                      <Image
                        src={pdfDownloadIcon}
                        alt="Download"
                        width={20}
                        height={20}
                      />
                    </Button>{" "}
                    to get AI-powered insights report.
                  </li>
                  <li>
                    You can click{" "}
                    <Button variant="outline" disabled={true}>
                      <Mail />
                      Deliver to Mail
                    </Button>{" "}
                    to save it on your dedicated mailbox
                  </li>
                  <li>
                    Finally <strong>Save Settings</strong> to deliver the AI
                    news insight on your preferred schedule and settings
                  </li>
                </ol>
              </div>
            )}
            {isGenerating && !aiInsight && (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {aiInsight && (
              <div className="markdown">
                <MarkdownPreview
                  source={aiInsight}
                  style={{ backgroundColor: "transparent", color: "black" }}
                />
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
