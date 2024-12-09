"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import { FormSection } from "./form-section";
import { timezones } from "@/lib/timezones";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_NEWS_SOURCES, languages } from "@/lib/constant";
import { NewsSubscription } from "@prisma/client";
import {
  NewsSubscriptionFormSchema,
  NewsSubscriptionFormType,
} from "@/app/types/subscription";
import {
  updateNewsSubscription,
  createNewsSubscription,
} from "@/app/actions/subscription";
import { ActionResponse } from "@/app/types";

interface SubscriptionFormProps {
  newsSubscription?: NewsSubscription;
  userId: string;
}

export function SubscriptionForm({
  newsSubscription,
  userId,
}: SubscriptionFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedSources, setSelectedSources] = React.useState<string[]>([]);
  const [customSource, setCustomSource] = React.useState("");

  const subscriptionDefault: NewsSubscriptionFormType = {
    name: newsSubscription?.name ?? "",
    keywords: newsSubscription?.keywords.join(",") ?? "",
    language: newsSubscription?.language ?? "en",
    timezone: newsSubscription?.timezone ?? "America/New_York",
    dateRange: newsSubscription?.dateRange ?? "past_24_hours",
    active: newsSubscription?.active ?? true,
    frequency: newsSubscription?.frequency ?? "every_day",
    timeToSend: newsSubscription?.timeToSend ?? "09:00", // Fixed to use timeToSend instead of frequency
    newsSources: [],
  };

  const form = useForm<NewsSubscriptionFormType>({
    resolver: zodResolver(NewsSubscriptionFormSchema),
    defaultValues: subscriptionDefault,
  });

  const updatedOrCreated = newsSubscription ? "updated" : "created";
  const saveOrCreate = newsSubscription ? "Save" : "Create";
  const savingOrCreating = newsSubscription ? "Saving..." : "Creating...";

  const handleAddCustomSource = () => {
    if (customSource && !selectedSources.includes(customSource)) {
      setSelectedSources([...selectedSources, customSource]);
      form.setValue("newsSources", [...selectedSources, customSource]);
      setCustomSource("");
    }
  };

  const handleRemoveSource = (source: string) => {
    const updatedSources = selectedSources.filter((s) => s !== source);
    setSelectedSources(updatedSources);
    form.setValue("newsSources", updatedSources);
  };

  async function onSubmit(data: NewsSubscriptionFormType) {
    setIsLoading(true);
    let actionResponse: ActionResponse;
    try {
      if (newsSubscription) {
        actionResponse = await updateNewsSubscription({
          ...data,
          id: newsSubscription.id,
        });
      } else {
        actionResponse = await createNewsSubscription({
          ...data,
          userId: userId,
        });
      }
      if (actionResponse.status === "success") {
        toast({
          title: "Success",
          description: `Subscription ${updatedOrCreated} successfully`,
        });
      } else {
        toast({
          title: "Error",
          description: `Failed to ${updatedOrCreated} subscription`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${updatedOrCreated} subscription`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormSection title="Basic Information">
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
        </FormSection>

        <FormSection title="Content Preferences">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
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
                          ? languages.find(
                              (language) => language.code === field.value
                            )?.name
                          : "Select language"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="start">
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
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.code === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.name}
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
                <FormLabel>Date Range</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </FormSection>

        <FormSection title="Delivery Settings">
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="every_12_hour">
                      Every 12 Hours
                    </SelectItem>
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

          <FormField
            control={form.control}
            name="timezone"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Timezone</FormLabel>
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
                          ? timezones.find((tz) => tz.value === field.value)
                              ?.label
                          : "Select timezone"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search timezone..." />
                      <CommandList>
                        <CommandEmpty>No timezone found.</CommandEmpty>
                        <CommandGroup className="max-h-[300px] overflow-auto">
                          {timezones.map((timezone) => (
                            <CommandItem
                              value={timezone.value}
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
        </FormSection>

        <FormSection title="News Sources">
          <FormField
            control={form.control}
            name="newsSources"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {DEFAULT_NEWS_SOURCES.map((source) => (
                      <Button
                        key={source.value}
                        type="button"
                        variant={
                          selectedSources.includes(source.value)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          const newSources = selectedSources.includes(
                            source.value
                          )
                            ? selectedSources.filter((s) => s !== source.value)
                            : [...selectedSources, source.value];
                          setSelectedSources(newSources);
                          form.setValue("newsSources", newSources);
                        }}
                      >
                        {source.label}
                      </Button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom source (e.g., mynews.com)"
                      value={customSource}
                      onChange={(e) => setCustomSource(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddCustomSource}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedSources.map((source) => (
                      <Badge
                        key={source}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {source}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => handleRemoveSource(source)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <FormDescription>
                  Select one or more news providers you'd like to follow
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </FormSection>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? savingOrCreating : saveOrCreate}
          </Button>
        </div>
      </form>
    </Form>
  );
}
