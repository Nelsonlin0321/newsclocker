import { Clock3 } from "lucide-react";
import Link from "next/link";
export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 hover:opacity-90 transition-all"
      aria-label="NewsAlert Pro - Return to homepage"
    >
      <Clock3 className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 text-white px-2 py-1 rounded">
        NewsClocker
      </span>
    </Link>
  );
}
