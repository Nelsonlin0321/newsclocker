"use client";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import SearchProvider from "@/app/providers/search-news-provider";
import { NewsSubscription } from "@prisma/client";
import { useRef } from "react";
import { AIInsights } from "./ai-insights";
import { NewsSearchResults } from "./news-search-results";
import { SubscriptionForm } from "./subscription-form";

interface Props {
  userId: string;
  newsSubscription?: NewsSubscription;
}

export function SubscriptionLayout({ userId, newsSubscription }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);

  return (
    <ReactQueryProvider>
      <SearchProvider>
        <div className="container mx-auto px-4 max-w-full space-y-2">
          <SubscriptionForm
            userId={userId}
            resultsRef={resultsRef}
            newsSubscription={newsSubscription}
          />
          <hr />
          <div className="grid lg:grid-cols-[1fr,1fr] gap-4">
            <div className="relative" ref={resultsRef}>
              {/* <ScrollArea className="h-[calc(100vh-20rem)]"> */}
              <NewsSearchResults />
              {/* </ScrollArea> */}
            </div>

            {/* <div className="hidden lg:block"> */}
            <div className="sticky top-24">
              <AIInsights />
            </div>
            {/* </div> */}
          </div>
        </div>
      </SearchProvider>
    </ReactQueryProvider>
  );
}
