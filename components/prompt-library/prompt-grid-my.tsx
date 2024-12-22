"use client";
import useSearchPromptParams from "@/hooks/use-search-prompt-params";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PromptCard } from "./prompt-card";
import PromptSkeletonGrid from "./prompt-skeleton-grid";
import usePromptSearch from "@/hooks/use-prompt-search";

type Props = {
  userId: string;
};

const MyPromptGrid = ({ userId }: Props) => {
  const { searchPromptParams } = useSearchPromptParams();

  const {
    data: searchResults,
    // error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    // isFetchingNextPage,
    // status,
  } = usePromptSearch({ ...searchPromptParams, userId });

  const fetchedItemsCount =
    searchResults?.pages.reduce(
      (total, page) => total + (page ? page.length : 0),
      0
    ) ?? 0;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedItemsCount}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={""}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page?.map((prompt, key) => (
                <PromptCard
                  prompt={prompt}
                  isMyPage={true}
                  userId={userId}
                  key={key}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </InfiniteScroll>
      {isLoading && <PromptSkeletonGrid />}
      {fetchedItemsCount === 0 && (
        <p className="text-lg text-muted-foreground pt-8 text-center">
          <span>No prompts found. </span>
          {searchPromptParams.q && (
            <span>Please try a different search term!</span>
          )}
        </p>
      )}
    </>
  );
};

export default MyPromptGrid;
