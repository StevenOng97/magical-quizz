"use client";

import { LoginDialogContext } from "@/lib/context/LoginDialogContextWrapper";
import { useContext } from "react";

const useLoginDialog = () => {
  const contextValue = useContext(LoginDialogContext);
  return contextValue;
};

export default useLoginDialog;
