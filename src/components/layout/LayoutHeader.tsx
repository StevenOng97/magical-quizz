"use client";
import Link from "next/link";
import { SignInButton, useUser } from "@clerk/nextjs";
import UserSection from "./components/UserSection";

const LayoutHeader = () => {
  const user = useUser();
  return (
    <header className="sticky top-0 bg-primary/80 backdrop-blur-md text-primary-foreground">
      <nav className="container  py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link
            href="/"
            className="text-3xl font-bold"
          >
            MagicQuizz
          </Link>
          {user.isLoaded && user?.user && (
            <div className="flex items-center gap-4">
              <UserSection user={user.user} />
            </div>
          )}

          {user.isLoaded && !user?.user && <SignInButton />}
        </div>
      </nav>
    </header>
  );
};

export default LayoutHeader;
