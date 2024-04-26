import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import LayoutHeader from "@/components/layout/LayoutHeader";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Magical Quizz",
  description: "Magicial Quizz Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <SessionProvider>
        <ReactQueryProvider>
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
              <LayoutHeader />
              {children}
            </ThemeProvider>
          </body>
        </ReactQueryProvider>
      </SessionProvider>
    </html>
  );
}
