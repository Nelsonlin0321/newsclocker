"use client";
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreatePromptButton } from "./create-prompt-button";
import { Search } from "lucide-react";
import { CategoryFilter } from "./category-filter";
import { useRouter } from "next/navigation";
import useSearchPromptParams from "@/hooks/use-search-prompt-params";

type Props = {};

const PromptTabList = (props: Props) => {
  const router = useRouter();
  const { searchPromptParams, setSearchPromptParams } = useSearchPromptParams();
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4 flex-wrap">
        <TabsList>
          <TabsTrigger
            value="all"
            onClick={() => router.push("/prompt-library/all-prompts")}
          >
            Public Prompts
          </TabsTrigger>
          <TabsTrigger
            value="favorite"
            onClick={() => router.push("/prompt-library/favorite-prompts")}
          >
            Favorite Prompts
          </TabsTrigger>
          <TabsTrigger
            value="my"
            onClick={() => router.push("/prompt-library/my-prompts")}
          >
            My Prompts
          </TabsTrigger>
        </TabsList>
        <CreatePromptButton />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-initial">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search news prompts..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
            onChange={(event) => {
              const newParams = {
                ...searchPromptParams,
                q: event.target.value,
              };
              setSearchPromptParams(newParams); // Ensure this triggers a re-fetch
              console.log(newParams); // Debugging: Check if params are updated
            }}
          />
        </div>
        <div className="flex gap-4">
          <CategoryFilter />
        </div>
      </div>
    </div>
  );
};

export default PromptTabList;
