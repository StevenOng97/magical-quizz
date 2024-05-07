import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex w-full h-[calc(100vh-3rem)] flex-col items-center justify-center">
      <Logo />
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default layout;
