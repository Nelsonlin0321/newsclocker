import Link from 'next/link';
import { Button } from './ui/button';
import UserNav from './user-nav';
import { auth } from '@clerk/nextjs/server';

export default async function Header() {

  const { userId } = await auth();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          NewsAlert Pro
        </Link>
        
        <nav>
          {userId ? (
            <UserNav />
          ) : (
            <div className="flex gap-4">
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}