import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import LayoutHeader from "@/components/layout/LayoutHeader";
import { Providers } from "@/components/providers";
import { ClerkProvider } from "@clerk/nextjs";
import LoginDialogContextWrapper from "@/lib/context/LoginDialogContextWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Magical Quizz",
  description: "Magicial Quizz Generator",
};
type IProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<IProps>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}
      >
        <ReactQueryProvider>
          <LoginDialogContextWrapper>
            <body
              className={cn(
                "min-h-screen bg-primary text-primary-foreground font-sans antialiased",
                fontSans.variable
              )}
            >
              <ThemeProvider
                attribute="class"
                enableSystem
                forcedTheme="light"
                disableTransitionOnChange
              >
                <Providers>
                  <LayoutHeader />
                  {children}
                </Providers>
              </ThemeProvider>
            </body>
          </LoginDialogContextWrapper>
        </ReactQueryProvider>
      </ClerkProvider>
    </html>
  );
}
