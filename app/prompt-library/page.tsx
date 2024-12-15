import { AppFilter } from "@/components/prompt-library/app-filter";
import { CategoryFilter } from "@/components/prompt-library/category-filter";
import { PromptCard } from "@/components/prompt-library/prompt-card";
import { builtInPrompts } from "@/lib/constant";
import { Search } from "lucide-react";

export default function PromptLibraryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Prompts to Try</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Explore prompts to create, edit, and get more done.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search prompts..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background"
          />
        </div>
        <div className="flex gap-4">
          <AppFilter />
          <CategoryFilter />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {builtInPrompts.map((prompt) => (
          <PromptCard key={prompt.id} {...prompt} />
        ))}
      </div>
    </div>
  );
}
