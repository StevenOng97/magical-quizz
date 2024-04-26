"use client";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutBtn from "@/components/layout/components/SignOutBtn";

type IProps = {
  session: Session | null;
  actionFunction: () => Promise<void>;
};

const UserSection = ({ session, actionFunction }: IProps) => {
  const pathName = usePathname();
  if (pathName === "/sign-in") return <></>;
  return (
    <div>
      {session?.user ? (
        <div className="flex items-center gap-4">
          {session.user.name && session.user.image && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Image
                    src={session.user.image}
                    alt={session.user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <NavMenu />
            </DropdownMenu>
          )}
          <SignOutBtn actionFunction={actionFunction} />
        </div>
      ) : (
        <Link href="sign-in">
          <Button variant="secondary">Sign In</Button>
        </Link>
      )}
    </div>
  );
};

export default UserSection;
