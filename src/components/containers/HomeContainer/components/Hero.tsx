import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="text-center flex gap-6 flex-col">
      <h1 className="text-7xl font-bold">
        Get <span className="text-secondary">quizzed</span> about anything!
      </h1>
      <h3 className="text-sm">
        Upload documents, and easily generate your quizzes with AI.
      </h3>
      <Button
        variant="secondary"
        className="mt-4 px-14 w-fit m-auto"
        asChild
      >
        <Link href="quizz/new">Get Started</Link>
      </Button>
    </section>
  );
};

export default Hero;
