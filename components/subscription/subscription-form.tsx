"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { languages } from "@/lib/mock-data";
import { timezones } from "@/lib/timezones";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  keywords: z.string().min(1, "At least one keyword is required"),
  language: z.string({
    required_error: "Please select a language.",
  }),
  timezone: z.string({
    required_error: "Please select a timezone.",
  }),
  dateRange: z.enum(
    [
      "any_time",
      "past_hour",
      "past_24_hours",
      "past_week",
      "past_month",
      "past_year",
    ],
    {
      required_error: "Please select a date range.",
    }
  ),
  active: z.boolean().default(true),
  frequency: z.enum(["every_12_hour", "every_day", "every_week"], {
    required_error: "Please select a frequency.",
  }),
  timeToSend: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
});

interface SubscriptionFormProps {
  id: string;
}

export function SubscriptionForm({ id }: SubscriptionFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      keywords: "",
      language: "en",
      timezone: "America/New_York",
      dateRange: "past_24_hours",
      active: true,
      frequency: "every_day",
      timeToSend: "09:00",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      // TODO: Implement API call
      console.log(data);
      toast({
        title: "Success",
        description: "Subscription updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subscription Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter subscription name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keywords</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter keywords separated by commas"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter multiple keywords separated by commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Language</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? languages.find(
                            (language) => language.code === field.value
                          )?.name
                        : "Select language"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {languages.map((language) => (
                          <CommandItem
                            value={language.code}
                            key={language.name}
                            onSelect={() => {
                              form.setValue("language", language.code);
                            }}
                          >
                            {language.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                language.code === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Timezone</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? timezones.find((tz) => tz.value === field.value)
                            ?.label
                        : "Select timezone"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search timezone..." />
                    <CommandList>
                      <CommandEmpty>No timezone found.</CommandEmpty>
                      <CommandGroup className="max-h-[300px] overflow-auto">
                        {timezones.map((timezone) => (
                          <CommandItem
                            value={timezone.label}
                            key={timezone.value}
                            onSelect={() => {
                              form.setValue("timezone", timezone.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                timezone.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {timezone.label}
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
          name="dateRange"
          render={({ field }) => (
            <FormItem>
              <FormLabel>News Date Range</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a date range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="any_time">Any Time</SelectItem>
                  <SelectItem value="past_hour">Past Hour</SelectItem>
                  <SelectItem value="past_24_hours">Past 24 Hours</SelectItem>
                  <SelectItem value="past_week">Past Week</SelectItem>
                  <SelectItem value="past_month">Past Month</SelectItem>
                  <SelectItem value="past_year">Past Year</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="every_12_hour">Every 12 Hours</SelectItem>
                  <SelectItem value="every_day">Every Day</SelectItem>
                  <SelectItem value="every_week">Every Week</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="timeToSend"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time to Send</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
