import { useQuery } from "@tanstack/react-query";
import { getUnreadCount } from "@/app/actions/mail/get-unread-count";

export function useUnreadMailCount(subscriptionId: string) {
  return useQuery({
    queryKey: ["unread-count", subscriptionId],
    queryFn: () => getUnreadCount(subscriptionId),
    staleTime: 1000 * 60, // 1 minute
  });
}
