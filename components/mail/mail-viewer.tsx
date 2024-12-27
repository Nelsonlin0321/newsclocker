import { Mail } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Trash2, X } from "lucide-react";
import Link from "next/link";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { NewsSearchResultResponse } from "@/app/types/search";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateMailStatus } from "@/app/actions/mail/update-mail-status";
import { toast } from "@/hooks/use-toast";
import { deleteMail } from "@/app/actions/mail/delete-mail";
import { useMailFilter } from "@/hooks/use-mail-filter";

interface Props {
  mail: Mail;
  onClose: () => void;
  onRefresh?: () => Promise<void>;
  isMobile?: boolean;
}

export function MailViewer({ mail, onClose, onRefresh, isMobile }: Props) {
  const searchResult = mail.searchResult as unknown as NewsSearchResultResponse;
  const { currentFilter } = useMailFilter();

  const handleDelete = async () => {
    try {
      if (currentFilter === "trash") {
        // Permanently delete
        const response = await deleteMail(mail.id);
        if (response.status === "success") {
          toast({
            title: "Success",
            description: "Mail permanently deleted",
          });
        } else {
          throw new Error(response.message);
        }
      } else {
        // Move to trash
        const response = await updateMailStatus(mail.id, { isTrashed: true });
        if (response.status === "success") {
          toast({
            title: "Success",
            description: "Mail moved to trash",
          });
        } else {
          throw new Error(response.message);
        }
      }

      if (onRefresh) {
        await onRefresh();
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to process mail",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h2 className="text-base md:text-xl font-semibold">{mail.title}</h2>
            <time className="text-xs md:text-sm text-muted-foreground">
              {new Date(mail.createdAt).toLocaleString()}
            </time>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
            title={
              currentFilter === "trash" ? "Delete permanently" : "Move to trash"
            }
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          {mail.pdfUrl && (
            <Link href={mail.pdfUrl} target="_blank">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <Download className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="sources">News Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="mt-0">
              <div className="max-w-3xl mx-auto">
                <MarkdownPreview
                  source={mail.content}
                  style={{
                    backgroundColor: "transparent",
                    fontSize: isMobile ? "14px" : "16px",
                    color: "black",
                  }}
                />
              </div>
            </TabsContent>

            <TabsContent value="sources" className="mt-0">
              <div className="grid gap-4">
                {searchResult.news.map((result, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {result.imageUrl && (
                          <img
                            src={result.imageUrl}
                            alt={result.title}
                            className="w-24 h-24 object-cover rounded-md"
                            loading="lazy"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <a
                            href={result.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-semibold hover:text-primary line-clamp-2 mb-2"
                          >
                            {result.title}
                          </a>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {result.snippet}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="font-medium">{result.source}</span>
                            <span>•</span>
                            <span>{result.date}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
}
