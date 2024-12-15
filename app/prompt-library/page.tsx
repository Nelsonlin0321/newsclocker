"use client";

import { Search } from "lucide-react";
import { PromptCard } from "@/components/prompt-library/prompt-card";
import { CategoryFilter } from "@/components/prompt-library/category-filter";
import { AppFilter } from "@/components/prompt-library/app-filter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { CreatePromptButton } from "@/components/prompt-library/create-prompt-button";

const prompts = [
  {
    id: "1",
    title: "Breaking News Alert",
    description:
      "Create a news subscription for breaking news about artificial intelligence and machine learning. Include major tech companies and research breakthroughs.",
    category: "Technology",
    app: "News Alert",
    icon: "🔔",
    isFavorite: true,
    isUserCreated: false,
  },
  {
    id: "2",
    title: "Market Updates",
    description:
      "Set up daily market news updates focusing on NASDAQ tech stocks, delivered at market open (9:30 AM EST) with pre-market analysis.",
    category: "Finance",
    app: "Market News",
    icon: "📈",
    isFavorite: false,
    isUserCreated: true,
  },
  // ... other prompts with added isFavorite and isUserCreated properties
];

export default function PromptLibraryPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredPrompts = {
    all: prompts,
    favorites: prompts.filter((prompt) => prompt.isFavorite),
    my: prompts.filter((prompt) => prompt.isUserCreated),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">News Prompts to Try</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore prompts to create personalized news subscriptions and stay
        informed.
      </p>

      <Tabs defaultValue="all" className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
                All Prompts
              </TabsTrigger>
              <TabsTrigger
                value="favorites"
                onClick={() => setActiveTab("favorites")}
              >
                Favorite Prompts
              </TabsTrigger>
              <TabsTrigger value="my" onClick={() => setActiveTab("my")}>
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
              />
            </div>
            <div className="flex gap-4">
              <AppFilter />
              <CategoryFilter />
            </div>
          </div>
        </div>

        <TabsContent value="all" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.all.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.favorites.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
            {filteredPrompts.favorites.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                No favorite prompts yet. Mark prompts as favorites to see them
                here.
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="my" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrompts.my.map((prompt) => (
              <PromptCard key={prompt.id} {...prompt} />
            ))}
            {filteredPrompts.my.length === 0 && (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                You haven't created any prompts yet. Create your first prompt to
                see it here.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
