import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
// Import the LandingPage component
import LandingPage from "./landingPage";

import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {

  title: "Snap Learn AI",
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
          <Header />

          <main>

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
