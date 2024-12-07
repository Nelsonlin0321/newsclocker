"use client";
import { UserButton } from '@clerk/nextjs';
import { MonitorCog  } from 'lucide-react';
import { useRouter } from 'next/navigation';
  
export default function UserNav() {

  const router = useRouter()
  return (
    <UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="Workspace"
            labelIcon={<MonitorCog className='w-4 h-4' />}
            onClick={() => router.push("/workspace")}
          />
      </UserButton.MenuItems>
      <UserButton.MenuItems>
          <UserButton.Action label="signOut" />
          <UserButton.Action label="manageAccount" />
        </UserButton.MenuItems>
      </UserButton>
  );
}