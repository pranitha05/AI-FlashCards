import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';
import React from 'react';

export default function Header() {
  return (
  
    <header className="p-4 bg-gradient-to-r from-gray-200 to-gray-700 dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 shadow-md text-white">

      
      <div className="flex justify-between items-center max-w-7xl mx-auto">

        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
          Snap Learn-AI
        </h1>

      <div className="flex items-center space-x-4">

        <SignedOut>
          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <SignInButton mode="modal">Sign In</SignInButton>
          </div>
        </SignedOut>

        <SignedIn>

        <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <UserButton showName />
          </div>
          
        </SignedIn>
      </div>

      </div>
    </header>
  );
}
