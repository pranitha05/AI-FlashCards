import React from 'react'
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
  } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="p-4 bg-transparent">
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
  )
}

