import { SignInButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-200 to-white dark:from-black dark:to-gray-900">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Welcome to Snap Learn AI</h1>
      <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">A platform to learn, grow and create flashcard!</p>  
    </div>
    </main>
  );
}
