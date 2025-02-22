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
import { Bell, BellOff, Clock, Edit2, Trash2 } from "lucide-react";
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
// import { languages } from "@/lib/constant";
import moment from "moment-timezone";
import { toast } from "react-hot-toast";
import { toggleSubscriptionActive } from "@/app/actions/news-subscription";
import { deleteSubscription } from "@/app/actions/news-subscription/delete-subscription";
import { useRouter } from "next/navigation";
import "./subscription-card.css";

interface SubscriptionCardProps {
  subscription: NewsSubscription;
}
const max_keywords_len = 3;
export function SubscriptionCard({
  subscription,
}: Readonly<SubscriptionCardProps>) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isActive, setIsActive] = useState(subscription.active);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { status, message } = await deleteSubscription(subscription.id);
      if (status === "error") {
        toast.error("Failed to delete subscription");
      } else {
        toast.success(message);
        // Optionally refresh the page or update the UI
        // window.location.reload();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete subscription");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleToggleActive = async () => {
    try {
      const newStatus = !isActive;
      setIsActive(newStatus);
      const { status, message } = await toggleSubscriptionActive(
        subscription.id,
        newStatus
      );
      if (status === "error") {
        toast.error("Failed to update subscription status");
      } else {
        toast.success(message);
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to update subscription status");
      setIsActive(subscription.active);
    }
  };

  // const getLanguageName = (code: string) => {
  //   return languages.find((lang) => lang.code === code)?.name ?? code;
  // };

  const formatNextRunTime = (date: Date) => {
    return moment(date)
      .tz(subscription.timezone)
      .format("MMMM D, YYYY h:mm A z");
  };

  return (
    <Card className="card relative">
      <CardHeader
        className="flex flex-row items-center justify-between space-y-0 pb-2 py-3"
        id="card-header"
      >
        <CardTitle className="text-lg font-bold">{subscription.name}</CardTitle>
        {isActive ? (
          <Bell className="h-6 w-6 text-primary" />
        ) : (
          <BellOff className="h-6 w-6 text-primary" />
        )}
        <Switch
          checked={isActive}
          onCheckedChange={handleToggleActive}
          aria-label="Toggle subscription"
        />
      </CardHeader>
      <CardContent id="card-content" className="py-3 min-h-[180px]">
        <div className="space-y-2">
          <div className="flex flex-row justify-evenly">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Keywords
              </h4>
              <div className="flex flex-wrap gap-1">
                {subscription.keywords
                  .slice(0, max_keywords_len)
                  .map((keyword, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="line-clamp-2"
                    >
                      {keyword}
                    </Badge>
                  ))}

                {subscription.keywords.length > max_keywords_len && (
                  <Badge variant={"secondary"}>...</Badge>
                )}
              </div>
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

          {isActive && (
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">
                Next Send Time
              </h4>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                {formatNextRunTime(subscription.nextRunTime)}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Link
            href={`/workspace/news-subscription/${subscription.id}`}
            className="flex-1"
          >
            <Button className="w-full" variant="outline">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="ghost">
                <Trash2 className="h-2 w-2 text-red-500" />
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
        </div>
        <Link className="w-full" href={`/mail/${subscription.id}`}>
          <Button className="w-full" variant="outline">
            📮 AI Insight Mailbox
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
