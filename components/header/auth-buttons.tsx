"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in">
        <Button variant="ghost" className="font-medium">
          Sign In
        </Button>
      </Link>
      <Link href="/sign-up">
        <Button className="font-medium bg-primary hover:bg-primary/90 transition-colors">
          Get Started
        </Button>
      </Link>
    </div>
  );
}