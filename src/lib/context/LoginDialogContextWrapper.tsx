"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { signIn } from "next-auth/react";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";

export type ILoginDialogContextWrapperValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginDialogContext =
  createContext<ILoginDialogContextWrapperValue>({
    open: false,
    setOpen: () => {},
  });

type IProps = {
  children: React.ReactNode;
};

const LoginDialogContextWrapper = ({ children }: IProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const memoObj = useMemo<ILoginDialogContextWrapperValue>(
    () => ({
      open,
      setOpen,
    }),
    [open, setOpen]
  );

  return (
    <LoginDialogContext.Provider value={memoObj}>
      <>
        {children}
        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogDescription className="flex flex-col gap-20 text-center text-black py-10">
                <p className="font-bold text-4xl">Welcome to MagicalQuizz</p>

                <Button
                  id="loginButton"
                  onClick={async () => await signIn("google")}
                  className="flex gap-4 px-10 py-7 rounded-full"
                >
                  <Image
                    src="/googleIcon.svg"
                    alt="google icon"
                    width={32}
                    height={32}
                  />
                  <p className="text-xl grow">Login with Google</p>
                </Button>
                <p>
                  By continuing, you agree to MagicalQuizz&apos;s Terms of
                  Service and acknowledge that you have read our Privacy Policy.
                </p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    </LoginDialogContext.Provider>
  );
};

export default LoginDialogContextWrapper;
