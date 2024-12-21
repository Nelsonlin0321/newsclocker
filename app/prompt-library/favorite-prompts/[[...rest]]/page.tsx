"use client";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import SearchPromptProvider from "@/app/providers/search-prompt-provider";
import FavoritePromptGrid from "@/components/prompt-library/prompt-grid-favorite";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SignIn, useAuth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = useAuth();

  if (!userId) {
    return (
      <SearchPromptProvider>
        <Tabs defaultValue="favorite" className="space-y-8">
          <PromptTabList />
          <div className="flex justify-center p-5">
            <SignIn forceRedirectUrl="/prompt-library/favorite-prompts" />
          </div>
        </Tabs>
      </SearchPromptProvider>
    );
  }

  return (
    <SearchPromptProvider>
      <ReactQueryProvider>
        <div className="flex flex-col gap-5">
          <Tabs defaultValue="favorite" className="space-y-8">
            <PromptTabList />
            <TabsContent value="favorite" className="m-0">
              <FavoritePromptGrid userId={userId} />
            </TabsContent>
          </Tabs>
        </div>
      </ReactQueryProvider>
    </SearchPromptProvider>
  );
}
