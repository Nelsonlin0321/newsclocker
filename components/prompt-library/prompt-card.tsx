"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bookmark, Unlock, Lock } from "lucide-react";
// import { toast } from "@/hooks/use-toast";
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
// import { useState } from "react";

interface Props {
  prompt: Prompt;
  isMyPage?: boolean;
  userId?: string | null;
}

export function PromptCard({ prompt, isMyPage, userId }: Props) {
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

  return (
    <Card className="group relative hover:shadow-lg transition-shadow">
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
        <p className="text-sm text-muted-foreground">{prompt.description}</p>
        <div className="flex gap-2 mt-4 justify-between">
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
