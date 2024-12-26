import { Mail } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";
import Link from "next/link";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface Props {
  mail: Mail;
  onClose: () => void;
}

export function MailViewer({ mail, onClose }: Props) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">AI News Insights</h2>
          <time className="text-sm text-muted-foreground">
            {new Date(mail.createdAt).toLocaleString()}
          </time>
        </div>
        <div className="flex items-center gap-2">
          {mail.pdfUrl && (
            <Link href={mail.pdfUrl} target="_blank">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="max-w-3xl mx-auto">
          <MarkdownPreview
            source={mail.content}
            style={{ backgroundColor: "transparent" }}
          />
        </div>
      </ScrollArea>
    </div>
  );
}
