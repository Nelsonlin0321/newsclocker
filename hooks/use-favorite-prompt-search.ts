import { searchFavoritePrompts } from "@/app/actions/prompt/search-favorite-prompt";
import { SearchPromptParams } from "@/app/types/prompt-search";
import { Prompt } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

const useFavoritePromptSearch = (
  userQuery: SearchPromptParams & { userId: string }
) => {
  return useInfiniteQuery<Prompt[]>({
    queryKey: ["favorite-prompt", userQuery],
    initialPageParam: 1,
    gcTime: 1000 * 30,
    queryFn: async (params) => {
      const results = await searchFavoritePrompts({
        userId: userQuery.userId,
        q: userQuery.q,
        category: userQuery.category,
        page: params.pageParam as number,
      });
      return results;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      return lastPage.length > 0 ? allPages.length + 1 : undefined;
    },
  });
};

export default useFavoritePromptSearch;
