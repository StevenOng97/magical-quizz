import React from "react";
import ManageSubscription from "./ManageSubscription";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const userInDb = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  const plan = userInDb?.subscribed ? "premium" : "free";

  return (
    <div className="p-4 border rounded-md">
      <h1 className="text-4xl mb-3">Subscription Details</h1>
      <p className="mb-2">You are currently on a {plan} plan</p>
      <ManageSubscription />
    </div>
  );
};

export default page;
