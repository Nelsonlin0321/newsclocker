"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { IconPicker } from "./icon-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { getCategories } from "@/app/actions/prompt/get-categories";
import { promptFormSchema, PromptFormValues } from "@/app/types/prompt";
import { useAuth } from "@clerk/nextjs";
import { createPrompt } from "@/app/actions/prompt/create-prompt";
import { useRouter } from "next/navigation";
import { Prompt } from "@prisma/client";
import { updatePrompt } from "@/app/actions/prompt/edit-prompt";
import { ActionResponse } from "@/app/types";
import AIIcon from "../icons/ai";
import { optimizePrompt } from "@/app/actions/ai/optimize-prompt";
import { readStreamableValue } from "ai/rsc";
import Spinner from "@/components/spinner";

interface Props {
  onSuccess: () => void;
  prompt?: Prompt;
  createOrEdit: "edit" | "create";
}

export function PromptForm({ onSuccess, prompt, createOrEdit }: Props) {
  const { userId } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);

  useEffect(() => {
    const initCategories = async () => {
      const fetchedCategory = await getCategories();
      setCategories([...fetchedCategory, "Other"]);
    };
    initCategories();
  }, []);

  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      title: prompt ? prompt.title : "",
      description: prompt ? prompt.description : "",
      category: prompt ? prompt.category : "",
      icon: prompt ? prompt.icon : "📰",
      id: prompt ? prompt.id : undefined,
    },
  });

  const buttonName = createOrEdit == "create" ? "Create" : "Save";

  const createdOrSaved = createOrEdit == "create" ? "created" : "saved";
  async function onSubmit(data: PromptFormValues) {
    setIsLoading(true);
    try {
      if (!userId) {
        toast({
          title: "Error",
          description: "Login is required.",
          variant: "destructive",
        });
        return;
      }

      let response: ActionResponse;
      if (createOrEdit == "create") {
        response = await createPrompt(data);
      } else {
        response = await updatePrompt(data);
      }

      if (response.status == "error") {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `Your prompt has been ${createdOrSaved} successfully.`,
      });

      onSuccess();
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create prompt. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onEnhancePrompt = async () => {
    setIsOptimizing(true);
    const content = await optimizePrompt({
      description: form.getValues("description"),
    });

    let textContent = "";

    for await (const delta of readStreamableValue(content)) {
      textContent = `${textContent}${delta}`;
      form.setValue("description", textContent);
    }
    setIsOptimizing(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter prompt title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter prompt description"
                  className="min-h-[200px] h-[400px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          variant={"secondary"}
          disabled={form.getValues("description") == ""}
          onClick={() => onEnhancePrompt()}
        >
          <AIIcon />
          {isOptimizing ? (
            <Spinner />
          ) : (
            <span className="text-xs">Enhance Your Prompt</span>
          )}
        </Button>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? categories.find((category) =>
                              category.startsWith(field.value)
                            )
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search Country..." />
                      <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((category) => (
                            <CommandItem
                              value={category}
                              key={category}
                              onSelect={() => {
                                form.setValue("category", category);
                              }}
                              className="gap-0"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category === field.value
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
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <IconPicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => onSuccess()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving" : buttonName}
          </Button>
        </div>
      </form>
    </Form>
  );
}
