"use client";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import SearchPromptProvider from "@/app/providers/search-prompt-provider";
import PromptGrid from "@/components/prompt-library/prompt-grid";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function page() {
  return (
    <SearchPromptProvider>
      <ReactQueryProvider>
        <div className="flex flex-col gap-5">
          <Tabs defaultValue="all" className="space-y-8">
            <PromptTabList />
            <TabsContent value="all" className="m-0">
              <PromptGrid isMyPage={false} />
            </TabsContent>
          </Tabs>
        </div>
      </ReactQueryProvider>
    </SearchPromptProvider>
  );
}
