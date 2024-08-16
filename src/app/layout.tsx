import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

// Import the LandingPage component
import LandingPage from "./landingPage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snap Learn",
  description: "A platform to learn and grow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-gray-900 text-gray-900 dark:text-white`}
        >
          <header className="p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <h1 className="text-2xl font-bold">Snap Learn</h1>
              <div>
                <SignedOut>
                  <SignInButton mode="modal" />
                </SignedOut>
                <SignedIn>
                  <UserButton showName />
                </SignedIn>
              </div>
            </div>
          </header>

          <main className="min-h-screen flex flex-col items-center justify-center p-4">
            <SignedOut>
              <LandingPage />
            </SignedOut>
            <SignedIn>
              {children}
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
