"use client";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import SearchPromptProvider from "@/app/providers/search-prompt-provider";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import PublicPromptGrid from "@/components/prompt-library/prompt-grid-public";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function page() {
  return (
    <SearchPromptProvider>
      <ReactQueryProvider>
        <div className="flex flex-col gap-5">
          <Tabs defaultValue="all" className="space-y-8">
            <PromptTabList />
            <TabsContent value="all" className="m-0">
              <PublicPromptGrid />
            </TabsContent>
          </Tabs>
        </div>
      </ReactQueryProvider>
    </SearchPromptProvider>
  );
}
