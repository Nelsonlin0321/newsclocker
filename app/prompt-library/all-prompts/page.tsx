import { PromptCard } from "@/components/prompt-library/prompt-card";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import prisma from "@/prisma/client";

export default async function page() {
  const prompts = await prisma.prompt.findMany({
    where: { share: true },
    include: { category: true },
  });
  return (
    <Tabs defaultValue="all" className="space-y-8">
      <PromptTabList />
      <TabsContent value="all" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
