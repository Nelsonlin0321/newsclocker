"use client";
import ReactQueryProvider from "@/app/providers/react-query-provider";
import SearchPromptProvider from "@/app/providers/search-prompt-provider";
import MyPromptGrid from "@/components/prompt-library/prompt-grid-my";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SignIn, useAuth } from "@clerk/nextjs";

export default function Page() {
  const { userId } = useAuth();

  if (!userId) {
    return (
      <SearchPromptProvider>
        <Tabs defaultValue="my" className="space-y-8">
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
          <Tabs defaultValue="my" className="space-y-8">
            <PromptTabList />
            <TabsContent value="my" className="m-0">
              <MyPromptGrid userId={userId} />
            </TabsContent>
          </Tabs>
        </div>
      </ReactQueryProvider>
    </SearchPromptProvider>
  );
}
