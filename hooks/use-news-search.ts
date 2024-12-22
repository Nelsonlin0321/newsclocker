import { useQuery } from "@tanstack/react-query";
import { searchNews } from "@/app/actions/search/search-news";
import { NewsSearchResultResponse, SearchParams } from "@/app/types/search";

export const NEWS_SEARCH_QUERY_KEY = "news-search";

export const useNewsSearch = (searchParams: SearchParams) => {
  return useQuery<NewsSearchResultResponse>({
    queryKey: [NEWS_SEARCH_QUERY_KEY, searchParams],
    queryFn: () => searchNews(searchParams),
    gcTime: 1 * 60 * 1000,
  });
};
