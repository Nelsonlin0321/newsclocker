import Link from "next/link";
import { Bell } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-all"
      aria-label="NewsAlert Pro - Return to homepage"
    >
      <Bell className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
        NewsClocker
      </span>
    </Link>
  );
}
