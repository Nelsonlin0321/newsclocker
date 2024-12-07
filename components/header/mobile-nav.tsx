"use client";

import * as React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationLinks } from "./navigation-links";
import { Logo } from "./logo";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden p-2"
          size="icon"
          aria-label="Open main menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] pr-0">
        <SheetHeader className="px-1">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-6 mt-8">
          <NavigationLinks 
            className="flex-col space-y-6 px-1" 
            mobile 
            onClick={() => setOpen(false)} 
          />
        </nav>
      </SheetContent>
    </Sheet>
  );
}