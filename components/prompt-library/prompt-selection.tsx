"use client";
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Check,
  ChevronsUpDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/app/actions/prompt/get-categories";
import PromptSkeletonGrid from "./prompt-skeleton-grid";
import useAllPromptSearch from "@/hooks/use-all-prompt-search";
import { SearchAllPromptParams } from "@/app/types/prompt-search";
import { ScrollArea } from "../ui/scroll-area";
import { PromptCardSelection } from "./prompt-card-selection";
type Props = {
  userId: string;
  setPrompt: (description: string) => void;
};
const PromptSelection = ({ userId, setPrompt }: Props) => {
  const [categories, setCategories] = useState<string[]>(["All"]);
  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(["All", ...fetchedCategories]);
    };
    fetchCategories();
  }, []);

  const [searchPromptParams, setSearchPromptParams] =
    useState<SearchAllPromptParams>({
      userId,
      tab: "public",
      category: "All",
      q: undefined,
      page: 1,
    });

  const { data: prompts, isLoading } = useAllPromptSearch(searchPromptParams);

  return (
    <Tabs className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <TabsList>
            <TabsTrigger
              value="public"
              onClick={() =>
                setSearchPromptParams({
                  ...searchPromptParams,
                  category: "All",
                  q: undefined,
                  page: 1,
                  tab: "public",
                })
              }
            >
              Public Prompts
            </TabsTrigger>
            <TabsTrigger
              value="favorite"
              onClick={() =>
                setSearchPromptParams({
                  ...searchPromptParams,
                  category: "All",
                  q: undefined,
                  page: 1,
                  tab: "favorite",
                })
              }
            >
              Favorite Prompts
            </TabsTrigger>
            <TabsTrigger
              value="my"
              onClick={() =>
                setSearchPromptParams({
                  ...searchPromptParams,
                  category: "All",
                  q: undefined,
                  page: 1,
                  tab: "my",
                })
              }
            >
              My Prompts
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search news prompts..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
              onChange={async (event) => {
                // await delay(300);
                const newParams = {
                  ...searchPromptParams,
                  q: event.target.value,
                };
                setSearchPromptParams(newParams);
              }}
            />
          </div>
          <div className="flex gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="h-[42px]">
                  {searchPromptParams.category ?? "Select category"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search Category..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          value={category}
                          key={category}
                          onSelect={() => {
                            setSearchPromptParams({
                              ...searchPromptParams,
                              category,
                            });
                          }}
                          className="gap-0"
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category === searchPromptParams.category
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <ScrollArea>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {prompts?.map((prompt, index) => (
            <React.Fragment key={index}>
              <PromptCardSelection prompt={prompt} setPrompt={setPrompt} />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
      {isLoading && <PromptSkeletonGrid />}
      <div className="flex items-center gap-2">
        <span>{`page ${searchPromptParams.page}`}</span>
        <Button
          color="gray"
          disabled={searchPromptParams.page == 1}
          onClick={() => {
            setSearchPromptParams({ ...searchPromptParams, page: 1 });
          }}
        >
          <ChevronsLeft />
        </Button>
        <Button
          color="gray"
          disabled={searchPromptParams.page == 1}
          onClick={() => {
            setSearchPromptParams({
              ...searchPromptParams,
              page: searchPromptParams.page - 1,
            });
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          color="gray"
          disabled={prompts?.length == 0}
          onClick={() => {
            setSearchPromptParams({
              ...searchPromptParams,
              page: searchPromptParams.page + 1,
            });
          }}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </Tabs>
  );
};

export default PromptSelection;
