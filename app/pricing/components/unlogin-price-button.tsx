import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {
  popular?: boolean;
};

const UnloginPriceButton = ({ popular }: Props) => {
  return (
    <Link href="/sign-in?nextUrl=/pricing">
      <Button className="w-full" variant={popular ? "default" : "outline"}>
        {"Get Started"}
      </Button>
    </Link>
  );
};

export default UnloginPriceButton;
