import { db } from "@/db";
import { users } from "@/db/schema";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const user = await currentUser();

  if (!user) {
    return new Response(
      JSON.stringify({
        error: "Unauthorized",
      }),
      {
        status: 401,
      }
    );
  }

  const userInDB = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });

  if (!user) {
    return new Response(
      JSON.stringify({
        error: "User not found",
      }),
      {
        status: 404,
      }
    );
  }

  let customer;
  if (userInDB?.stripeCustomerId) {
    customer = {
      id: userInDB.stripeCustomerId,
    };
  } else {
    const customerData: {
      metadata: {
        dbId: string;
      };
    } = {
      metadata: {
        dbId: user.id,
      },
    };
    const response = await stripe.customers.create(customerData);

    customer = { id: response.id };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const url = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${baseUrl}/billing`,
  });

  return new Response(JSON.stringify({ url }), {
    status: 200,
  });
}
