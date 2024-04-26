import { Button } from "@/components/ui/button";
import React from "react";

type IProps = {
  actionFunction: () => Promise<void>;
};
const SignOutBtn = ({ actionFunction }: IProps) => {
  return (
    <form action={actionFunction}>
      <Button
        type="submit"
        variant="ghost"
      >
        Sign Out
      </Button>
    </form>
  );
};

export default SignOutBtn;
