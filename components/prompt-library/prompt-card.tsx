"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
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
// import { useState } from "react";

interface Props {
  prompt: Prompt;
  isMyPage?: boolean;
  userId: string | null;
}

export function PromptCard({ prompt, isMyPage, userId }: Props) {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(prompt.description);
  //   toast({
  //     title: "Copied to clipboard",
  //     description: "The prompt has been copied to your clipboard.",
  //   });
  // };

  // const [favorite, setFavorite] = useState(false);

  // useEffect(() => {});

  // const [newTodo, setNewTodo] = useState(false);

  const queryClient = useQueryClient();

  const { data: isBookmark } = useQuery({
    queryKey: ["book-mark", prompt.id, userId],
    queryFn: () => getBookmark(prompt.id, userId),
    gcTime: 1 * 60 * 1000,
  });
  // const [favorite, setFavorite] = useState(isBookmark);

  const toggleBookmarkMutation = useMutation({
    mutationFn: async (newBookmarkStatus: boolean) => {
      await bookmark(prompt.id, newBookmarkStatus, userId);
    },
    onSuccess: () => {
      // Optionally refetch the bookmark status or update local state
      // setFavorite(!favorite);
      // queryClient.invalidateQueries({
      //   queryKey: ["book-mark", prompt.id, userId],
      //   exact: true,
      // });
      queryClient.setQueryData(["book-mark", prompt.id, userId], () => {
        // Ensure oldTodos is an array before updating
        return !isBookmark;
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

        {isMyPage && <EditPromptButton prompt={prompt} />}
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
