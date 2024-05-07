"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import QuizzSubmission from "./QuizzSubmission";
import { InferSelectModel } from "drizzle-orm";
import {
  questionAnswers,
  questions as DbQuestions,
  quizzes,
} from "@/db/schema";
import { saveSubmission } from "@/actions/saveSubmissions";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import CircularProgressBar from "@/components/CircularProgressBar";
import ComponentSpinner from "@/components/ComponentSpinner";

const questionIndex = ["A.", "B.", "C.", "D."];

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof DbQuestions> & { answers: Answer[] };
type Quizz = InferSelectModel<typeof quizzes> & { questions: Question[] };

type Props = {
  quizz: Quizz;
};

export default function QuizzQuestions(props: Props) {
  const { questions, name, description } = props.quizz;
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<
    { questionId: number; answerId: number }[]
  >([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState(
    questions.length * 30 * 1000
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  // Convert remaining time to hh:mm:ss format
  const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
  const milliseconds = remainingTime % 1000;

  // Format time to have leading zeroes if necessary
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;

  const scorePercentage: number = Math.round((score / questions.length) * 100);
  const selectedAnswer: number | null | undefined = userAnswers.find(
    (item) => item.questionId === questions[currentQuestion].id
  )?.answerId;

  const currentProgress: number = Math.round(
    (userAnswers.length / questions.length) * 100
  );
  const quizzCompletedCheck = userAnswers.length === questions.length;
  const firstQuestion = currentQuestion === 0;
  const lastQuestion = currentQuestion === questions.length - 1;

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 50; // Decrement time by 1 second
      });
    }, 50);

    if (quizzCompletedCheck) {
      clearInterval(timer);
      return;
    }

    return () => clearInterval(timer); // Cleanup the timer on unmount
  }, [started, quizzCompletedCheck]);

  const handleStart = () => {
    if (!started) {
      setStarted(true);
    }
  };

  const handleNext = () => {
    if (!lastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnswer = (answer: Answer, questionId: number) => {
    const newUserAnswersArr = [
      ...userAnswers,
      {
        questionId,
        answerId: answer.id,
      },
    ];
    setUserAnswers(newUserAnswersArr);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await saveSubmission({ score }, props.quizz.id);
    } catch (e) {
      console.log(e);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handlePressPrev = () => {
    if (!firstQuestion) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    }
  };

  const handleExit = () => {
    router.push("/dashboard");
  };
  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        scorePercentage={scorePercentage}
        totalQuestions={questions.length}
      />
    );
  }

  return (
    <div className="flex flex-col bg-transparent/40 rounded-xl w-full m-auto">
      <div className="w-[90%] h-[90%] p-20 m-auto rounded-xl flex flex-col gap-4 justify-center">
        <div className="flex flex-col-reverse sm:flex-row justify-between gap-2">
          <div className="flex items-center gap-5">
            <Clock
              height={40}
              width={40}
            />
            <div>
              <p>Time Remaining</p>
              <p className="text-2xl font-bold">{formattedTime}</p>
            </div>
          </div>
          {started && (
            <Button
              variant="secondary"
              onClick={handleSubmit}
              disabled={isSubmitting || !quizzCompletedCheck}
              className="font-bold text-xl"
            >
              {isSubmitting ? <ComponentSpinner /> : "Submit"}
            </Button>
          )}
        </div>
        <main className="flex justify-center items-center flex-1 py-5">
          {!started && (
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <h2 className="text-md font-bold">
                <p className="text-muted-foreground">{description}</p>
                <div className="mt-10">
                  <p>Number of questions: {questions.length}</p>
                  <p>Quizz Duration: {`${minutes}:${seconds}`}</p>
                </div>
              </h2>
            </div>
          )}
          {started && (
            <div className="flex flex-col-reverse lg:flex-row justify-between w-full gap-5 lg:gap-20">
              <div>
                <h2 className="text-xl font-bold">
                  <p className="text-opacity-70 text-muted-foreground">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                  <p>{questions[currentQuestion].questionText}</p>
                </h2>
                <div className="grid grid-cols-1 gap-6 mt-6">
                  {questions[currentQuestion].answers.map((answer, idx) => {
                    const variant =
                      selectedAnswer === answer.id
                        ? answer.isCorrect
                          ? "leaf"
                          : "destructive"
                        : "outline";
                    return (
                      <Button
                        key={answer.id}
                        disabled={!!selectedAnswer}
                        variant={variant}
                        onClick={() =>
                          handleAnswer(answer, questions[currentQuestion].id)
                        }
                        className={cn(
                          "disabled:opacity-100 text-black h-auto text-xs lg:text-base",
                          {
                            "bg-leaf": !!selectedAnswer && answer.isCorrect,
                          }
                        )}
                      >
                        <p className="whitespace-normal w-full text-left">
                          {questionIndex[idx]} {answer.answerText}
                        </p>
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center items-center">
                <CircularProgressBar
                  percentage={currentProgress}
                  strokeWidth={16}
                  text={`${userAnswers.length}/${questions.length}`}
                />
              </div>
            </div>
          )}
        </main>
        <div className="footer pb-4 relative">
          {!started && (
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleStart}
                className="px-20 font-bold"
              >
                START
              </Button>
            </div>
          )}
        </div>
        {started && (
          <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
            <div className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handlePressPrev}
                disabled={firstQuestion}
              >
                <ChevronLeft color="black" />
              </Button>
              <ProgressBar
                value={(userAnswers.length / questions.length) * 100}
              />
              <Button
                size="icon"
                variant="outline"
                onClick={handleNext}
                disabled={lastQuestion}
              >
                <ChevronRight color="black" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
