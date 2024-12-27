"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bookmark, Unlock, Lock, BadgeCheck } from "lucide-react";
import { bookmark } from "@/app/actions/prompt/bookmark";
import { getBookmark } from "@/app/actions/prompt/get-bookmark";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Prompt } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CopyPromptButton } from "./copy-prompt-button";
import { DeletePromptButton } from "./delete-prompt-button";
import { EditPromptButton } from "./edit-prompt-button";
import { getIsShared } from "@/app/actions/prompt/get-is-shared";
import { setIsShared } from "@/app/actions/prompt/set-is-shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { truncateText } from "@/lib/utils";
import axios from "axios";
// import { getUser } from "@/app/actions/user/get-user";
// import { useState } from "react";

interface Props {
  prompt: Prompt;
  isMyPage?: boolean;
  userId?: string | null;
}

export function PromptCard({ prompt, isMyPage, userId }: Props) {
  // const { data: user } = useQuery({
  //   queryKey: ["getUser", userId],
  //   queryFn: () => getUser({ userId }),
  //   gcTime: 1 * 60 * 1000,
  // });

  const queryClient = useQueryClient();
  const { data: isBookmark } = useQuery({
    queryKey: ["getBookmark", prompt.id, userId],
    queryFn: () => getBookmark(prompt.id, userId),
    gcTime: 1 * 60 * 1000,
  });
  // const [favorite, setFavorite] = useState(isBookmark);

  const toggleBookmarkMutation = useMutation({
    mutationFn: async (newBookmarkStatus: boolean) => {
      await bookmark(prompt.id, newBookmarkStatus, userId);
    },
    onSuccess: () => {
      queryClient.setQueryData(["getBookmark", prompt.id, userId], () => {
        return !isBookmark;
      });
    },
  });

  const { data: isShared } = useQuery({
    queryKey: ["getIsShared", prompt.id, userId],
    queryFn: () => getIsShared(prompt.id),
    gcTime: 1 * 60 * 1000,
  });

  const toggleShareMutation = useMutation({
    mutationFn: async (isShared: boolean) => {
      await setIsShared(prompt.id, isShared, userId);
    },
    onSuccess: () => {
      queryClient.setQueryData(["getIsShared", prompt.id, userId], () => {
        return !isShared;
      });
    },
  });

  async function getUserImageUrl(userId: string) {
    if (userId == "public") {
      return undefined;
    } else {
      const response = await axios
        .get<{ imageUrl: string }>(`/api/user/${userId}`)
        .then((res) => res.data);
      return response.imageUrl;
    }
  }

  const { data: imageUrl } = useQuery({
    queryKey: ["getUser", prompt.id, userId],
    queryFn: () => getUserImageUrl(prompt.userId),
    gcTime: 1 * 60 * 1000,
  });

  return (
    <Card className="group relative hover:shadow-lg transition-shadow flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{prompt.icon}</span>
          <h3 className="font-semibold text-lg">{prompt.title}</h3>
        </div>
        {!isMyPage && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CopyPromptButton prompt={prompt} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate to make your own</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {isMyPage && (
          <>
            <EditPromptButton prompt={prompt} />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      toggleShareMutation.mutate(!isShared);
                    }}
                  >
                    {isShared ? (
                      <Unlock className="h-4 w-4" />
                    ) : (
                      <Lock className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isShared ? <p>Set it private</p> : <p>Make it public</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {truncateText(prompt.description)}
        </p>
        <div className="flex gap-2 mt-4 justify-between items-center">
          {/* <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"> */}
          {prompt.userId == "public" && <BadgeCheck className="text-primary" />}

          {prompt.userId !== "public" && imageUrl && (
            <Avatar className="w-6 h-6">
              <AvatarImage src={imageUrl} alt="User" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          )}

          {/* </span> */}
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {prompt.category}
          </span>
          {isMyPage && <DeletePromptButton prompt={prompt} />}

          {!isMyPage && userId && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toggleBookmarkMutation.mutate(!isBookmark);
              }}
            >
              <Bookmark
                className="h-4 w-4"
                fill={isBookmark ? "gold" : "transparent"}
              />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
