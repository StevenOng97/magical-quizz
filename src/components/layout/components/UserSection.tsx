"use client";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import SignOutBtn from "@/components/layout/components/SignOutBtn";
import useLoginDialog from "@/lib/hooks/context/useLoginDialog";

type IProps = {
  session: Session | null;
  actionFunction: () => Promise<void>;
};

const UserSection = ({ session, actionFunction }: IProps) => {
  const { setOpen } = useLoginDialog();
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
        <Button
          onClick={() => setOpen(true)}
          variant="secondary"
        >
          Sign In
        </Button>
      )}
    </div>
  );
};

export default UserSection;
