import { auth, signOut } from "@/auth";
import Link from "next/link";
import UserSection from "@/components/layout/components/UserSection";

const LayoutHeader = async () => {
  const session = await auth();

  const actionFunction = async () => {
    "use server";
    await signOut();
  };

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
          <UserSection
            session={session}
            actionFunction={actionFunction}
          />
        </div>
      </nav>
    </header>
  );
};

export default LayoutHeader;
