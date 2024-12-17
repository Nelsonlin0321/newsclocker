"use client";

import { Bookmark, Copy, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Prompt } from "@prisma/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  prompt: Prompt;
  isMy?: boolean;
}

export function PromptCard({ prompt, isMy }: Props) {
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(prompt.description);
  //   toast({
  //     title: "Copied to clipboard",
  //     description: "The prompt has been copied to your clipboard.",
  //   });
  // };

  return (
    <Card className="group relative hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{prompt.icon}</span>
          <h3 className="font-semibold text-lg">{prompt.title}</h3>
        </div>
        {!isMy && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  // onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Duplicate to make your own</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}

        {isMy && (
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{prompt.description}</p>
        <div className="flex gap-2 mt-4 justify-between">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {prompt.category}
          </span>
          {isMy && (
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash className="h-4 w-4 text-red-400" />
            </Button>
          )}

          {!isMy && (
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
