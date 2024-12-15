"use client";
import { useRef } from "react";
import { SubscriptionForm } from "./subscription-form";
import { NewsSubscription } from "@prisma/client";
import { NewsSearchResults } from "./news-search-results";
import { mockNewsSearchResponse } from "@/lib/mock-data";
import SearchProvider from "@/app/providers/search-news-provider";
import ReactQueryProvider from "@/app/providers/react-query-provider";

interface Props {
  userId: string;
  newsSubscription?: NewsSubscription;
}

export function SubscriptionLayout({ userId, newsSubscription }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);
  return (
    <ReactQueryProvider>
      <SearchProvider>
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-8">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SubscriptionForm
              userId={userId}
              resultsRef={resultsRef}
              newsSubscription={newsSubscription}
            />
          </div>
          <div className="flex flex-col" ref={resultsRef}>
            <div className="overflow-auto">
              <NewsSearchResults NewsSearchResponse={mockNewsSearchResponse} />
            </div>
          </div>
        </div>
      </SearchProvider>
    </ReactQueryProvider>
  );
}
