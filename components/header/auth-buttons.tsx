"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <>
      {/* <div className="flex items-center"> */}
      <Link href="/sign-in">
        <Button className="bg-primary hover:bg-primary/90 transition-colors mr-2">
          Sign In
        </Button>
      </Link>
      {/* <Link href="/sign-up">
        <Button className="bg-primary hover:bg-primary/90 transition-colors">
          Get Started
        </Button>
      </Link> */}
      {/* </div> */}
    </>
  );
}
