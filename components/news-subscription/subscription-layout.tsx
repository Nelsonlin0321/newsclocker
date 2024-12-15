"use client";
import { useRef } from "react";
import { SubscriptionForm } from "./subscription-form";
import { NewsSearchResults } from "./news-search-results";
import { NewsSubscription } from "@prisma/client";
import SearchProvider from "@/app/providers/search-news-provider";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { AIInsights } from "./ai-insights";

interface Props {
  userId: string;
  newsSubscription?: NewsSubscription;
}

export function SubscriptionLayout({ userId, newsSubscription }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);

  return (
    <ReactQueryProvider>
      <SearchProvider>
        <div className="container mx-auto px-4 max-w-full">
          {/* Settings Section */}
          {/* <Card className="mb-8 p-6"> */}
          <SubscriptionForm
            userId={userId}
            resultsRef={resultsRef}
            newsSubscription={newsSubscription}
          />

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-[1.5fr,1fr] gap-8">
            {/* Search Results Panel */}
            <div className="relative" ref={resultsRef}>
              <ScrollArea className="h-[calc(100vh-20rem)]">
                <NewsSearchResults />
              </ScrollArea>
            </div>

            {/* AI Insights Panel */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <AIInsights />
              </div>
            </div>
          </div>
        </div>
      </SearchProvider>
    </ReactQueryProvider>
  );
}
