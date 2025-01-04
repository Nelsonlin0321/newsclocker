"use client";
import { UserButton } from "@clerk/nextjs";
import { ReceiptText } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
}

const customerPortal = process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL!;

export default function UserNav({ email }: Props) {
  const router = useRouter();
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Manage Billing"
          labelIcon={<ReceiptText className="w-4 h-4" />}
          onClick={() =>
            router.push(customerPortal + `?prefilled_email=${email}`)
          }
        />
      </UserButton.MenuItems>
      <UserButton.MenuItems>
        <UserButton.Action label="signOut" />
        <UserButton.Action label="manageAccount" />
      </UserButton.MenuItems>
    </UserButton>
  );
}
