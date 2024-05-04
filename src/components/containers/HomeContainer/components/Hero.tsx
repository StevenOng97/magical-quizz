"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const Hero = () => {
  const { user } = useUser();

  return (
    <section className="text-center flex gap-6 flex-col">
      <h1 className="text-7xl font-bold">
        Get <span className="text-secondary">quizzed</span> about anything!
      </h1>
      <h3 className="text-sm">
        Upload documents, and easily generate your quizzes with AI.
      </h3>
      {user ? (
        <Link href={"/quizz/new"}>
          <Button
            variant="secondary"
            className="mt-4 px-14 w-fit m-auto"
          >
            Start quizzing now
          </Button>
        </Link>
      ) : (
        <Link href={"/sign-in"}>
          <Button
            variant="secondary"
            className="mt-4 px-14 w-fit m-auto"
          >
            Get started
          </Button>
        </Link>
      )}
    </section>
  );
};

export default Hero;
