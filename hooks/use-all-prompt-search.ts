import { searchAllPrompts } from "@/app/actions/prompt/search-all-prompts";
import { SearchAllPromptParams } from "@/app/types/prompt-search";
import { Prompt } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

const useAllPromptSearch = (userQuery: SearchAllPromptParams) => {
  return useQuery<Prompt[]>({
    queryKey: ["all-prompt", userQuery],
    gcTime: 1000 * 30,
    queryFn: async () => {
      const results = await searchAllPrompts({
        q: userQuery.q,
        category: userQuery.category,
        page: userQuery.page,
        userId: userQuery.userId,
        tab: userQuery.tab,
      });
      return results;
    },
  });
};

export default useAllPromptSearch;
