"use client"
import {  useSession } from "@clerk/nextjs";

export default function Home() {
  const { session} = useSession();
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white-800">Welcome back {session?.user.fullName}</h1>
    </main>
  );
}
