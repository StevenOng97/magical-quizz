import { db } from "@/db";

import { accounts, quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import QuizzQuestions from "../QuizzQuestions";
import { auth } from "@/auth";

const page = async ({
  params,
}: {
  params: {
    quizzId: string;
  };
}) => {
  const session = await auth();
  const userId = session?.user?.id;

  const account = await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId!),
  });

  const quizzId = params.quizzId;
  const quizz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, parseInt(quizzId)),
    with: {
      questions: {
        with: {
          answers: true,
        },
      },
    },
  });

  if (!quizzId || !quizz || quizz.questions.length === 0) {
    return <div>Quizz not found</div>;
  }

  return (
    <QuizzQuestions
      quizz={quizz}
      accessToken={account?.access_token!}
    />
  );
};

export default page;
