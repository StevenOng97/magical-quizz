import { quizzes, questions, quizzSubmissions, users } from "@/db/schema";
import { db } from "@/db";
import { count, eq, avg } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const getUserMetrics = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  // get total # of user quizzes
  const numQuizzes = await db
    .select({ value: count() })
    .from(quizzes)
    .where(eq(quizzes.userId, user.id));

  // get total # of questions
  const numQuestions = await db
    .select({ value: count() })
    .from(questions)
    .innerJoin(quizzes, eq(questions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, user.id));

  // get total # of submissions
  const numSubmissions = await db
    .select({ value: count() })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, user.id));

  // get the average score
  const avgScore = await db
    .select({ value: avg(quizzSubmissions.score) })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .where(eq(users.id, user.id));

  return [
    { label: "# of Quizzes", value: numQuizzes[0].value },
    { label: "# of Questions", value: numQuestions[0].value },
    { label: "# of Submissions", value: numSubmissions[0].value },
    { label: "Average Score", value: avgScore[0].value },
  ];
};

export default getUserMetrics;
