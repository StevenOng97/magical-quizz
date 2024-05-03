"use client";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavMenu } from "@/components/NavMenu";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

const UserSection = ({ user }: any) => {
  const pathName = usePathname();
  if (pathName === "/sign-in") return <></>;
  return (
    <div>
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Image
                src={user?.imageUrl}
                alt={user?.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <NavMenu />
        </DropdownMenu>
        <SignOutButton />
      </div>
    </div>
  );
};

export default UserSection;
