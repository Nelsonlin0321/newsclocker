import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavigationLinks } from "./navigation-links";
import { AuthButtons } from "./auth-buttons";
import UserNav from "@/components/user-nav";
import { auth } from "@clerk/nextjs/server";
import { getUser } from "@/app/actions/user/get-user";

export async function Header() {
  const { userId } = await auth();

  let email: string | undefined | null;

  if (userId) {
    const user = await getUser({ userId });
    email = user?.emailAddresses[0]?.emailAddress;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 md:h-[4.5rem] items-center justify-between">
        <div className="flex items-center gap-10">
          <MobileNav />
          <Logo />
          <NavigationLinks className="hidden md:flex" />
        </div>

        <div className="flex items-center gap-4">
          {email ? <UserNav email={email} /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}
