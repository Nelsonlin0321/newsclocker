import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredMails } from "@/app/actions/mail/get-filtered-mails";
import { useMailFilter } from "@/hooks/use-mail-filter";

const MAIL_LIST_QUERY_KEY = "mail-list";

export function useMailList(subscriptionId: string) {
  const { currentFilter } = useMailFilter();
  const queryClient = useQueryClient();

  const { data: mails = [], isLoading } = useQuery({
    queryKey: [MAIL_LIST_QUERY_KEY, subscriptionId, currentFilter],
    queryFn: () => getFilteredMails(subscriptionId, currentFilter),
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
  });

  const refreshMails = async () => {
    await queryClient.invalidateQueries({
      queryKey: [MAIL_LIST_QUERY_KEY, subscriptionId, currentFilter],
    });
  };

  return {
    mails,
    isLoading,
    refreshMails,
  };
}
