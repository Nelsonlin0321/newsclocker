import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const FreePlanButton = (props: Props) => {
  return (
    <Link href="/workspace">
      <Button className="w-full" variant={"outline"}>
        {"Get Started"}
      </Button>
    </Link>
  );
};

export default FreePlanButton;
