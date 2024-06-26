import UploadDoc from "../UploadDoc";
import { getUserSubscription } from "@/actions/userSubscriptions";
import UpgradePlan from "../UpgradePlan";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const subscribed: boolean | null | undefined = await getUserSubscription({
    userId: user.id,
  });

  return (
    <div className="flex flex-col flex-1">
      <main className="py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24">
        <UploadDoc />
      </main>
    </div>
  );
};

export default page;
