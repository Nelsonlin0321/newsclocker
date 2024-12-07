import Link from 'next/link';
import { Button } from './ui/button';
import UserNav from './user-nav';

export default function Header() {
  const isAuthenticated = false; // Replace with actual auth state

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          NewsAlert Pro
        </Link>
        
        <nav>
          {isAuthenticated ? (
            <UserNav />
          ) : (
            <div className="flex gap-4">
              <Link href="/auth/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}