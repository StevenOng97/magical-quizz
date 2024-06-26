"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ComponentSpinner from "@/components/ComponentSpinner";

const DEFAULT_NUMBER_OF_QUIZ = 5;

const UploadDoc = () => {
  const [document, setDocument] = useState<File | null | undefined>(null);
  const [numberOfQuiz, setNumberOfQuiz] = useState<number>(
    DEFAULT_NUMBER_OF_QUIZ
  );
  const [answerPerQuizz, setAnswerPerQuizz] = useState<number>(
    DEFAULT_NUMBER_OF_QUIZ
  );
  const [customPrompt, setCustomPrompt] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [redisKey, setRedisKey] = useState<string>();

  useEffect(() => {
    if (!redisKey) return;

    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/tasks?taskId=${redisKey}`, {
          method: "GET",
        });
        const data = await response.json();
        const quizzId = data.quizzId;
        if (quizzId) {
          router.push(`/quizz/${quizzId}`);
        }
      } catch (err) {
        console.log("error while generating", err);
      }
    };

    const intervalId = setInterval(fetchResult, 3000); // Check every 3 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, [redisKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!document) {
      setError("Please upload the document first");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("pdf", document as Blob);

    try {
      const res = await fetch("/api/quizz/generate", {
        method: "POST",
        body: formData,
      });
      if (res.status === 200) {
        const { keyId } = await res.json();
        setRedisKey(keyId);
      }
    } catch (e) {
      setIsLoading(false);
      console.log("error while generating", e);
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="w-full">
      {!isLoading && (
        <h2 className="text-3xl font-bold mb-4">
          What do you want to be quizzed about today?
        </h2>
      )}
      {isLoading ? (
        <div>
          <ComponentSpinner />
          <p>Generating your quizz....</p>
        </div>
      ) : (
        <form
          className="w-full"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="document"
            className="bg-secondary w-full flex h-20 rounded-md border-4 border-dashed border-blue-900 relative max-w-96 m-auto"
          >
            <div className="absolute text-black inset-0 m-auto flex justify-center items-center">
              {document && document?.name ? document.name : "Drag a file"}
            </div>
            <input
              type="file"
              id="document"
              className="relative block w-full h-full z-50 opacity-0 "
              onChange={handleDocumentUpload}
              accept=".pdf"
            />
          </label>
          <p className="text-primary-foreground my-2">
            Supported file types: pdf
          </p>
          {error ? <p className="text-red-600">{error}</p> : null}
          {document && (
            <Button
              size="lg"
              className="mt-5"
              type="submit"
              variant="secondary"
            >
              Generate Quizz 🪄
            </Button>
          )}
        </form>
      )}
    </div>
  );
};

export default UploadDoc;
