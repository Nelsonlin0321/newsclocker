"use client";
import { useRef } from "react";
import { SubscriptionForm } from "./subscription-form";
import { NewsSubscription } from "@prisma/client";
import { NewsSearchResults } from "./news-search-results";
import { mockNewsSearchResults } from "@/lib/mock-data";

interface Props {
  userId: string;
  newsSubscription?: NewsSubscription;
}

export function SubscriptionLayout({ userId, newsSubscription }: Props) {
  const resultsRef = useRef<HTMLDivElement>(null);
  return (
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
          <NewsSearchResults results={mockNewsSearchResults} />
        </div>
      </div>
    </div>
  );
}
