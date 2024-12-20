import React from "react";
import PromptSkeleton from "./prompt-skeleton";

type Props = {};

const PromptSkeletonGrid = (props: Props) => {
  const numberOfCards = 16; // Define the number of cards

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
      {Array.from({ length: numberOfCards }, (_, index) => (
        <PromptSkeleton key={index} />
      ))}
    </div>
  );
};

export default PromptSkeletonGrid;
