"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
      console.log("error while generating", e);
    }
    setIsLoading(false);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(e?.target?.files?.[0]);
    if (error) {
      setError("");
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <p>Loading...</p>
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
            />
          </label>
          <p className="text-primary-foreground my-2">
            Supported file types: pdf
          </p>
          {error ? <p className="text-red-600">{error}</p> : null}
          {document && (
            <div className="border border-white rounded-lg w-full p-10">
              <div className="flex flex-col md:flex-row gap-10 mb-5">
                <div className="text-left">
                  <Label>Number of Quizz</Label>
                  <Input
                    value={numberOfQuiz}
                    type="number"
                    className="text-black"
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setNumberOfQuiz(newValue > 0 ? newValue : 1);
                    }}
                  />
                </div>

                <div className="text-left">
                  <Label>Number of Answers per Quizz</Label>
                  <Input
                    value={answerPerQuizz}
                    type="number"
                    className="text-black"
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setAnswerPerQuizz(newValue > 0 ? newValue : 1);
                    }}
                  />
                </div>

                <div className="text-left grow">
                  <Label>Custom Prompt</Label>
                  <Input
                    className="text-black"
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                  />
                </div>
              </div>

              <div className="text-left">
                <Label>Export Type</Label>
                <RadioGroup
                  defaultValue="quizzUrl"
                  className="flex gap-10"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="quizzUrl"
                      id="quizzUrl"
                      className="text-white border-white"
                    />
                    <Label htmlFor="quizzUrl">Quizz URL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="googleForm"
                      id="googleForm"
                      className="text-white border-white"
                    />
                    <Label htmlFor="googleForm">Google Form</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="pdfFile"
                      id="pdfFile"
                      className="text-white border-white"
                    />
                    <Label htmlFor="pdfFile">PDF File</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button
                size="lg"
                className="mt-5"
                type="submit"
                variant="secondary"
              >
                Generate Quizz 🪄
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default UploadDoc;
