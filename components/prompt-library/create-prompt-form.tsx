"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
// import { CategoryCombobox } from "./category-combobox";
import { toast } from "@/hooks/use-toast";
import { IconPicker } from "./icon-picker";
import { CategoryCombobox } from "./category-combobox";

const promptFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  icon: z.string().min(1, "Icon is required"),
});

type PromptFormValues = z.infer<typeof promptFormSchema>;

interface CreatePromptFormProps {
  onSuccess: () => void;
}

export function CreatePromptForm({ onSuccess }: CreatePromptFormProps) {
  const form = useForm<PromptFormValues>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      icon: "📝",
    },
  });

  async function onSubmit(data: PromptFormValues) {
    try {
      // Here you would typically make an API call to save the prompt
      console.log("Form submitted:", data);

      toast({
        title: "Success",
        description: "Your prompt has been created successfully.",
      });

      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create prompt. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategoryCombobox
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
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
          <Button type="submit">Create Prompt</Button>
        </div>
      </form>
    </Form>
  );
}
