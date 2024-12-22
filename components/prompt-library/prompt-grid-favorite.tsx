"use client";
import useFavoritePromptSearch from "@/hooks/use-favorite-prompt-search";
import useSearchPromptParams from "@/hooks/use-search-prompt-params";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PromptCard } from "./prompt-card";
import PromptSkeletonGrid from "./prompt-skeleton-grid";

type Props = {
  userId: string;
};

const FavoritePromptGrid = ({ userId }: Props) => {
  const { searchPromptParams } = useSearchPromptParams();

  const {
    data: searchResults,
    // error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    // isFetchingNextPage,
    // status,
  } = useFavoritePromptSearch({ ...searchPromptParams, userId });

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
                  isMyPage={false}
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
          No prompts found. Please try a different search term!
        </p>
      )}
    </>
  );
};

export default FavoritePromptGrid;
