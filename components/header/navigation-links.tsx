"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavigationLinksProps {
  className?: string;
  mobile?: boolean;
  onClick?: () => void;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/workspace", label: "Workspace" },
  { href: "/prompt-library", label: "Prompt Library" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function NavigationLinks({
  className,
  mobile,
  onClick,
}: NavigationLinksProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex items-center gap-8", className)}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={cn(
              "relative text-sm font-medium transition-colors hover:text-primary",
              "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full",
              mobile ? "text-foreground" : "text-muted-foreground",
              isActive && "text-primary after:w-full"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
