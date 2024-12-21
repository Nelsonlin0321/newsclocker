import { searchPrompts } from "@/app/actions/prompt/search-prompt";
import { SearchPromptParams } from "@/app/types/prompt-search";
import { Prompt } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

const usePublicPromptSearch = (userQuery: SearchPromptParams) => {
  return useInfiniteQuery<Prompt[]>({
    queryKey: ["public-or--prompt", userQuery],
    initialPageParam: 1,
    gcTime: 1000 * 30,
    queryFn: async (params) => {
      const results = await searchPrompts({
        q: userQuery.q,
        category: userQuery.category,
        page: params.pageParam as number,
        userId: userQuery.userId,
      });
      return results;
    },

    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default usePublicPromptSearch;
