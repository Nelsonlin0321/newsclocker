"use client";
import usePublicPromptSearch from "@/hooks/use-prompt-search";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PromptCard } from "./prompt-card";
import useSearchPromptParams from "@/hooks/use-search-prompt-params";

type Props = {
  isMyPage?: boolean;
};

const PromptGrid = ({ isMyPage }: Props) => {
  const { userId } = useAuth();
  const { searchPromptParams } = useSearchPromptParams();

  const {
    data: searchResults,
    // error,
    fetchNextPage,
    hasNextPage,
    // isFetching,
    // isFetchingNextPage,
    // status,
  } = usePublicPromptSearch(searchPromptParams);

  const fetchedItemsCount =
    searchResults?.pages.reduce(
      (total, page) => total + (page ? page.length : 0),
      0
    ) ?? 0;

  console.log(searchResults?.pages);
  return (
    // <ReactQueryProvider>
    <InfiniteScroll
      dataLength={fetchedItemsCount}
      hasMore={hasNextPage}
      next={() => fetchNextPage()}
      loader={<div>Loading...</div>}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults?.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page?.map((prompt, key) => (
              <PromptCard
                prompt={prompt}
                isMyPage={isMyPage}
                userId={userId}
                key={key}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default PromptGrid;
