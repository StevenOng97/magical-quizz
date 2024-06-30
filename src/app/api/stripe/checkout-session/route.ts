import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { price, quantity = 1, id } = await req.json();
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

  const userInDb = await db.query.users.findFirst({
    where: eq(users.id, user.id),
  });
  let customer;

  if (userInDb?.stripeCustomerId) {
    customer = {
      id: userInDb.stripeCustomerId,
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

    await db
      .update(users)
      .set({
        stripeCustomerId: customer.id,
      })
      .where(eq(users.id, user.id));
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${baseUrl}/request-management/${id}?bookingSuccess=true`,
      customer: customer.id,
      payment_method_types: ["card"],
      line_items: [
        {
          price,
          quantity,
        },
      ],
      mode: "subscription",
    });

    if (session) {
      return new Response(
        JSON.stringify({
          sessionId: session.id,
        }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          error: "Failed to create a session",
        }),
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.log("Error creating checkout session", error);
    return new Response(
      JSON.stringify({
        error,
      }),
      {
        status: 500,
      }
    );
  }
}
