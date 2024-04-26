import { Separator } from "@/components/ui/separator";
import React from "react";

type IStepComponentProps = {
  stepCount: number;
  title: string;
  desc: string;
};
const StepComponent = ({ stepCount, title, desc }: IStepComponentProps) => {
  return (
    <div className="text-left">
      <Separator />
      <p className="font-bold pt-2">Step {stepCount}</p>
      <p className="text-secondary font-bold text-xl py-2">{title}</p>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

const guideSteps = [
  {
    id: 1,
    title: "Sign up for an account",
    desc: "It's only take a few clicks to get started.",
  },
  {
    id: 2,
    title: "Upload your PDF file",
    desc: "We will generate quizz based on your uploaded file.",
  },
  {
    id: 3,
    title: "Start quizzing",
    desc: "It's that simple. Start quizzing now!",
  },
];

const Guide = () => {
  return (
    <section className="text-center">
      <h2 className="text-5xl font-bold pb-5">Start quizzing in minutes</h2>
      <p className="text-sm w-[500px] m-auto">
        Creating quiz was never this easy. MagicQuizz allows you to generate
        your own quizz based on your documents in seconds.
      </p>
      <div className="grid grid-cols-3 gap-10 pt-20">
        {guideSteps.map((step) => {
          return (
            <StepComponent
              key={step.id}
              stepCount={step.id}
              title={step.title}
              desc={step.desc}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Guide;
