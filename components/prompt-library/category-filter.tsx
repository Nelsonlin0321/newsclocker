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

export function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

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
        <Button variant="outline" role="combobox" className="w-64 h-[42px]">
          {selectedCategory ?? "Select category"}
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
                    setSelectedCategory(category);
                  }}
                  className="gap-0"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      category === selectedCategory
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
  // return (
  //   <Select defaultValue="All">
  //     <SelectTrigger className="w-[180px]">
  //       <SelectValue placeholder="Select category" />
  //     </SelectTrigger>
  //     <SelectContent>
  //       {categories.map((category) => (
  //         <SelectItem key={category} value={category}>
  //           {category}
  //         </SelectItem>
  //       ))}
  //     </SelectContent>
  //   </Select>
  // );
}
