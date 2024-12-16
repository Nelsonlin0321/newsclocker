import { PromptCard } from "@/components/prompt-library/prompt-card";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import prisma from "@/prisma/client";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <Tabs defaultValue="my" className="space-y-8">
        <PromptTabList />
        <div className="flex justify-center p-5">
          <SignIn forceRedirectUrl="/prompt-library/favorite-prompts" />
        </div>
      </Tabs>
    );
  }

  const prompts = await prisma.prompt.findMany({
    where: { userId },
    include: { category: true },
  });

  return (
    <Tabs defaultValue="my" className="space-y-8">
      <PromptTabList />
      <TabsContent value="my" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
