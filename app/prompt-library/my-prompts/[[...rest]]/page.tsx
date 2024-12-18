import Pagination from "@/components/pagination";
import PromptGrid from "@/components/prompt-library/prompt-grid";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { adminUserIds } from "@/lib/constant";
import prisma from "@/prisma/client";
import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const pageSize = 32;

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
      <Tabs defaultValue="my" className="space-y-8">
        <PromptTabList />
        <div className="flex justify-center p-5">
          <SignIn forceRedirectUrl="/prompt-library/favorite-prompts" />
        </div>
      </Tabs>
    );
  }

  const isAdmin = adminUserIds.includes(userId);

  let pageParam = parseInt(searchParams.page);
  let currentPage = isNaN(pageParam) ? 1 : pageParam;

  // const query = searchParams.q;

  const where = isAdmin ? { OR: [{ userId }, { share: true }] } : { userId };

  const prompts = await prisma.prompt.findMany({
    where: where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.prompt.count({ where: where });

  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="my" className="space-y-8">
        <PromptTabList />
        <TabsContent value="my" className="m-0">
          <PromptGrid prompts={prompts} isMyPage={true} />
        </TabsContent>
      </Tabs>
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </div>
  );
}
