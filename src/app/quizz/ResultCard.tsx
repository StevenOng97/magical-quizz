import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  isCorrect: boolean | null | undefined;
  correctAnswer: string;
};

const ResultCard = (props: Props) => {
  const { isCorrect } = props;

  if (isCorrect === null || isCorrect === undefined) {
    return null;
  }

  const text = isCorrect
    ? "Correct!"
    : "Incorrect! The correct answer is: " + props.correctAnswer;

  return (
    <div
      className={cn(
        "border-2 rounded-lg p-4 text-center text-lg font-semibold my-4",
        {
          "bg-leaf text-black": isCorrect,
          "bg-destructive": !isCorrect,
        }
      )}
    >
      {text}
    </div>
  );
};

export default ResultCard;
