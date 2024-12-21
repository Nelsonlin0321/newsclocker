"use client";

import { getCategories } from "@/app/actions/prompt/get-categories";
import { Button } from "@/components/ui/button";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

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

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import useSearchPromptParams from "@/hooks/use-search-prompt-params";

export function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  // const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { searchPromptParams, setSearchPromptParams } = useSearchPromptParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(["All", ...fetchedCategories]);
    };
    fetchCategories();
  }, []);

  return (
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
                    setSearchPromptParams({ ...searchPromptParams, category });
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
  );
}
