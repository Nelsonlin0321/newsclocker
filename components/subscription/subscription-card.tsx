"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { NewsSubscription } from "@prisma/client";
import { Clock, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { languages } from "@/lib/constant";
import moment from "moment-timezone";

interface SubscriptionCardProps {
  subscription: NewsSubscription;
  onDelete?: (id: string) => Promise<void>;
}

export function SubscriptionCard({
  subscription,
  onDelete,
}: Readonly<SubscriptionCardProps>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;
    setIsDeleting(true);
    try {
      await onDelete(subscription.id);
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name ?? code; // Updated to use nullish coalescing
  };

  const formatNextRunTime = (date: Date) => {
    return moment(date)
      .tz(subscription.timezone)
      .format("MMMM D, YYYY h:mm A z");
  };

  return (
    <Card className="relative">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2 py-3"
        id="card-header"
      >
        <CardTitle className="text-lg font-bold">{subscription.name}</CardTitle>
        <Switch
          checked={subscription.active}
          aria-label="Toggle subscription"
        />
      </CardHeader>
      <CardContent id="card-content" className="py-3">
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Keywords
            </h4>
            <div className="flex flex-wrap gap-1">
              {subscription.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Language
              </h4>
              <p className="text-sm">
                {getLanguageName(subscription.language)}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Frequency
              </h4>
              <p className="text-sm capitalize">
                {subscription.frequency.replace(/_/g, " ")}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-1">
              Next Run
            </h4>
            <div className="flex items-center text-sm">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              {formatNextRunTime(subscription.nextRunTime)}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link
          href={`/workspace/news-subscription/${subscription.id}`}
          className="flex-1"
        >
          <Button className="w-full" variant="outline">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Subscription</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this subscription? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
