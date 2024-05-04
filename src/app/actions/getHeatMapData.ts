import { quizzes, quizzSubmissions, users } from "@/db/schema";
import { db } from "@/db";
import { eq, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

const getHeatMapData = async () => {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const data = await db
    .select({
      createdAt: quizzSubmissions.createdAt,
      count: sql<number>`cast(count(${quizzSubmissions.id}) as int)`,
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .innerJoin(users, eq(quizzes.userId, users.id))
    .groupBy(quizzSubmissions.createdAt);

  return { data };
};

export default getHeatMapData;
