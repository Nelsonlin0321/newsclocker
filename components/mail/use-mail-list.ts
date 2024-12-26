import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredMails } from "@/app/actions/mail/get-filtered-mails";
import { useMailFilter } from "@/hooks/use-mail-filter";
import { Mail } from "@prisma/client";

const MAIL_LIST_QUERY_KEY = "mail-list";

export function useMailList(subscriptionId: string) {
  const { currentFilter } = useMailFilter();
  const queryClient = useQueryClient();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<Mail[]>({
      queryKey: [MAIL_LIST_QUERY_KEY, subscriptionId, currentFilter],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        const mails = await getFilteredMails(
          subscriptionId,
          currentFilter,
          pageParam as number
        );
        return mails;
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : undefined;
      },
      staleTime: 1000 * 60, // Consider data fresh for 1 minute
    });

  const mails = data?.pages.flat() ?? [];

  const refreshMails = async () => {
    await queryClient.invalidateQueries({
      queryKey: [MAIL_LIST_QUERY_KEY, subscriptionId, currentFilter],
    });
  };

  return {
    mails,
    isLoading,
    refreshMails,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
