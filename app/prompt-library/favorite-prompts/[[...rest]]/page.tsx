import Pagination from "@/components/pagination";
import { PromptCard } from "@/components/prompt-library/prompt-card";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import prisma from "@/prisma/client";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const pageSize = 64;

interface Props {
  searchParams: {
    page: string;
    q: string;
    status: string;
    languageId: string;
  };
}

export default async function page({ searchParams }: Props) {
  const { userId } = await auth();

  if (!userId) {
    return (
      <Tabs defaultValue="favorite" className="space-y-8">
        <PromptTabList />
        <div className="flex justify-center p-5">
          <SignIn forceRedirectUrl="/prompt-library/favorite-prompts" />
        </div>
      </Tabs>
    );
  }

  let pageParam = parseInt(searchParams.page);
  let currentPage = isNaN(pageParam) ? 1 : pageParam;

  // const query = searchParams.q;

  const where = { userId };

  const favoritePrompts = await prisma.favoritePrompt.findMany({
    where: where,
    select: { prompt: { include: { category: true } } },
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.prompt.count({ where: where });

  return (
    <>
      <Tabs defaultValue="favorite" className="space-y-8">
        <PromptTabList />
        <TabsContent value="favorite" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoritePrompts.map((favoritePrompt) => (
              <PromptCard
                key={favoritePrompt.prompt.id}
                prompt={favoritePrompt.prompt}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </>
  );
}
