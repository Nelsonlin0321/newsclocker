import Pagination from "@/components/pagination";
import PromptGrid from "@/components/prompt-library/prompt-grid";
import PromptTabList from "@/components/prompt-library/prompt-tab-list";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import prisma from "@/prisma/client";

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
  let pageParam = parseInt(searchParams.page);
  let currentPage = isNaN(pageParam) ? 1 : pageParam;

  // const query = searchParams.q;

  const where = { share: true };
  const prompts = await prisma.prompt.findMany({
    where: where,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.prompt.count({ where: where });

  if (currentPage * pageSize > itemCount) {
    currentPage = Math.max(Math.ceil(itemCount / pageSize), 1);
  }

  return (
    <div className="flex flex-col gap-5">
      <Tabs defaultValue="all" className="space-y-8">
        <PromptTabList />
        <TabsContent value="all" className="m-0">
          <PromptGrid prompts={prompts} />
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
