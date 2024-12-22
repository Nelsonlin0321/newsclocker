"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { truncateText } from "@/lib/utils";
import { Prompt } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DialogClose } from "../ui/dialog";
interface Props {
  setPrompt: (description: string) => void;
  prompt: Prompt;
}

export function PromptCardSelection({ prompt, setPrompt }: Props) {
  // Added onSelect to destructured props

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
    queryKey: ["getUser", prompt.id, prompt.userId],
    queryFn: () => getUserImageUrl(prompt.userId),
    gcTime: 1 * 60 * 1000,
  });

  return (
    <DialogClose asChild>
      <Card
        className="group relative hover:shadow-lg transition-shadow flex flex-col justify-between"
        onClick={() => {
          setPrompt(prompt.description);
        }}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{prompt.icon}</span>
            <h3 className="font-semibold text-lg">{prompt.title}</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {truncateText(prompt.description)}
          </p>
          <div className="flex gap-2 mt-4 justify-between items-center">
            {/* <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs text-primary"> */}
            {prompt.userId == "public" && (
              <BadgeCheck className="text-primary" />
            )}

            {prompt.userId !== "public" && imageUrl && (
              <Avatar className="w-6 h-6">
                <AvatarImage src={imageUrl} alt="User" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            )}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {prompt.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </DialogClose>
  );
}
