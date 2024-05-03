import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  boolean,
  varchar,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: varchar("id", { length: 191 }).primaryKey(),
  username: text("username"),
  email: text("email").notNull(),
  bio: text("bio"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
  stripeCustomerId: text("stripe_customer_id"),
  subscribed: boolean("subscribed"),
});

export const usersRelations = relations(users, ({ many }) => ({
  quizzes: many(quizzes),
}));

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  userId: text("user_id").references(() => users.id),
});

export const attachments = pgTable(
  "attachments",
  {
    id: serial("id").primaryKey(),
    resourceType: varchar("resource_type").notNull(),
    resourceId: integer("resource_id").notNull(),
    filePath: varchar("file_path").notNull(),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").default(new Date()),
  },
  (attachment) => ({
    index: index("resource_id_resource_type_idx").on(
      attachment.resourceId,
      attachment.resourceType
    ),
  })
);

export const quizzesRelations = relations(quizzes, ({ many, one }) => ({
  questions: many(questions),
  submissions: many(quizzSubmissions),
}));

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  questionText: text("question_text"),
  quizzId: integer("quizz_id"),
});

export const questionsRelations = relations(questions, ({ one, many }) => ({
  quizz: one(quizzes, {
    fields: [questions.quizzId],
    references: [quizzes.id],
  }),
  answers: many(questionAnswers),
}));

export const questionAnswers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id"),
  answerText: text("answer_text"),
  isCorrect: boolean("is_correct"),
});

export const questionAnswersRelations = relations(
  questionAnswers,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionAnswers.questionId],
      references: [questions.id],
    }),
  })
);

export const quizzSubmissions = pgTable("quizz_submissions", {
  id: serial("id").primaryKey(),
  quizzId: integer("quizz_id"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizzSubmissionsRelations = relations(
  quizzSubmissions,
  ({ one, many }) => ({
    quizz: one(quizzes, {
      fields: [quizzSubmissions.quizzId],
      references: [quizzes.id],
    }),
  })
);
