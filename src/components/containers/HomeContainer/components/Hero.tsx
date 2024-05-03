"use client";
import { Button } from "@/components/ui/button";
import useLoginDialog from "@/lib/hooks/context/useLoginDialog";
import { Session } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type IProps = {
  session: Session | null;
};
const Hero = ({ session }: IProps) => {
  const { setOpen } = useLoginDialog();

  return (
    <section className="text-center flex gap-6 flex-col">
      <h1 className="text-7xl font-bold">
        Get <span className="text-secondary">quizzed</span> about anything!
      </h1>
      <h3 className="text-sm">
        Upload documents, and easily generate your quizzes with AI.
      </h3>
      {session ? (
        <Button
          variant="secondary"
          className="mt-4 px-14 w-fit m-auto"
        >
          <Link href={"/quizz/new"}>Start quizzing now</Link>
        </Button>
      ) : (
        <Button
          variant="secondary"
          className="mt-4 px-14 w-fit m-auto"
          onClick={() => setOpen(true)}
        >
          Get Started
        </Button>
      )}
    </section>
  );
};

export default Hero;
