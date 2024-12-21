"use client";

import {
  createNewsSubscription,
  updateNewsSubscription,
} from "@/app/actions/news-subscription";
import { ActionResponse } from "@/app/types";
import {
  NewsSubscriptionFormSchema,
  NewsSubscriptionFormType,
} from "@/app/types/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import useSearchParams from "@/hooks/use-search-params";
import { useToast } from "@/hooks/use-toast";
import { countries, DEFAULT_NEWS_SOURCES, languages } from "@/lib/constant";
import { timezones } from "@/lib/timezones";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewsSubscription } from "@prisma/client";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { Check, ChevronsUpDown, Plus, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { FormSection } from "./form-section";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PromptSelection from "../prompt-library/prompt-selection";

interface SubscriptionFormProps {
  newsSubscription?: NewsSubscription;
  userId: string;
  resultsRef: React.RefObject<HTMLDivElement>;
}

export function SubscriptionForm({
  newsSubscription,
  userId,
  resultsRef,
}: SubscriptionFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const initNewsSources = newsSubscription ? newsSubscription?.newsSources : [];

  const [selectedSources, setSelectedSources] =
    React.useState<string[]>(initNewsSources);
  const [customSource, setCustomSource] = React.useState("");
  const { setSearchParams } = useSearchParams();

  React.useEffect(() => {
    if (newsSubscription) {
      setSearchParams({
        keywords: newsSubscription.keywords.join(","),
        country: newsSubscription.country,
        dateRange: newsSubscription.dateRange,
        language: newsSubscription.language,
        newsSources: newsSubscription.newsSources,
      });
    }
  }, [newsSubscription, setSearchParams]);

  const subscriptionDefault: NewsSubscriptionFormType = {
    name: newsSubscription?.name ?? "",
    keywords: newsSubscription?.keywords.join(",") ?? "",
    country: newsSubscription?.country ?? "us",
    language: newsSubscription?.language ?? "en",
    timezone: newsSubscription?.timezone ?? "America/New_York",
    dateRange: newsSubscription?.dateRange ?? "past_24_hours",
    active: newsSubscription?.active ?? true,
    frequency: newsSubscription?.frequency ?? "every_day",
    timeToSend: newsSubscription?.timeToSend ?? "09:00",
    newsSources: newsSubscription?.newsSources ?? [],
    newsPrompt: newsSubscription?.newsPrompt ?? "Please summarize the news",
  };

  const form = useForm<NewsSubscriptionFormType>({
    resolver: zodResolver(NewsSubscriptionFormSchema),
    defaultValues: subscriptionDefault,
  });

  const updatedOrCreated = newsSubscription ? "updated" : "created";
  const saveOrCreate = newsSubscription ? "Save settings" : "Create";
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
        router.refresh();
        // router.push("/workspace");
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

  const goToTopOrBottom = () => {
    const headerOffset = 100; // Adjust this value based on your header height
    const elementPosition =
      resultsRef.current?.getBoundingClientRect().top ?? 0;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const saveSearchParams = () => {
    const formValues = form.getValues();
    setSearchParams({
      keywords: formValues.keywords,
      country: formValues.country,
      language: formValues.language,
      dateRange: formValues.dateRange,
      newsSources: formValues.newsSources,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="mb-1 flex justify-between items-center">
        <h3 className="text-2xl text-gray-600">Setting</h3>
        <Button
          onClick={() => {
            saveSearchParams();
            goToTopOrBottom();
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Search News
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="grid gap-4 lg:grid-cols-[1fr,3fr]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: Tesla" {...field} />
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
                  <FormLabel>Search Keywords</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Example: Tesla,Elon Musk"
                        {...field}
                        className="pl-10" // Add padding to the left to make space for the icon
                      />
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  {/* <FormDescription>
                    Enter multiple keywords separated by commas
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormSection title="Content Preferences" className="space-y-2">
              <div className="grid gap-4 grid-flow-col">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
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
                                ? countries.find(
                                    (country) => country.code === field.value
                                  )?.name
                                : "Select country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0" align="start">
                          <Command>
                            <CommandInput placeholder="Search Country..." />
                            <CommandList>
                              <CommandEmpty>No country found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map((country) => (
                                  <CommandItem
                                    value={country.name}
                                    key={country.name}
                                    onSelect={() => {
                                      form.setValue("country", country.code);
                                    }}
                                    className="gap-0"
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        country.code === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    <span className="mr-2 flex h-4 w-6">
                                      {getUnicodeFlagIcon(
                                        country.code.toUpperCase()
                                      )}
                                    </span>
                                    {country.name}
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
                                    value={language.name}
                                    key={language.code}
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
                          <SelectItem value="past_24_hours">
                            Past 24 Hours
                          </SelectItem>
                          <SelectItem value="past_week">Past Week</SelectItem>
                          <SelectItem value="past_month">Past Month</SelectItem>
                          <SelectItem value="past_year">Past Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormSection>

            <FormSection title="Delivery Settings">
              <div className="grid gap-4 grid-flow-col">
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
                                ? timezones.find(
                                    (tz) => tz.value === field.value
                                  )?.label
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
              </div>
            </FormSection>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <FormSection title="News Sources" className="space-y-2">
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
                                ? selectedSources.filter(
                                    (s) => s !== source.value
                                  )
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
                      {`Select one or more news providers. News will be provided by these sources only; no filtering if none are selected.`}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>
            <FormSection title="Define Prompt" className="space-y-2">
              <FormField
                control={form.control}
                name="newsPrompt"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>News Prompt</FormLabel>
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Enter your custom prompt or select from gallery..."
                        className="min-h-[150px]"
                        {...field}
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full"
                          >
                            Browse Prompt Gallery
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-5xl max-h-[80vh] overflow-scroll">
                          <DialogHeader>
                            <DialogTitle>Select a Prompt</DialogTitle>
                          </DialogHeader>
                          {/* <ScrollArea className="h-[100vh]"> */}
                          <PromptSelection userId={userId} />
                          {/* <div className="grid grid-cols-2 gap-4 p-4">
                              {prompts.map((prompt) => (
                                <Card
                                  key={prompt.id}
                                  className="cursor-pointer hover:border-primary"
                                  onClick={() => {
                                    form.setValue(
                                      "newsPrompt",
                                      prompt.description
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                      {prompt.title}
                                    </CardTitle>
                                    <div className="text-2xl">
                                      {prompt.icon}
                                    </div>
                                  </CardHeader>
                                  <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                      {prompt.description}
                                    </p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div> */}
                          {/* </ScrollArea> */}
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </FormSection>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/workspace")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? savingOrCreating : saveOrCreate}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
