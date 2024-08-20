"use client"

import { useEffect, useState } from 'react';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="relative bg-[url('/img/flashcardlogo.png')] flex w-full flex-col justify-center items-center h-screen">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-55"></div>

      <div className="relative flex justify-center flex-col cursor-default z-10">
        
        {/* "Welcome to" */}
        <div className="relative uppercase tracking-widest text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 shadow-lg flex items-center">
          <span className="mr-4">Welcome to</span>
          <div className="flex space-x-5">
            <svg className="text-yellow-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <svg className="text-yellow-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
            <svg className="text-yellow-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="4" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* "SNAP LEARN AI" */}
        <div className="text-[5rem] md:text-[6rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg">
          SNAP LEARN-AI
        </div>

        {/* "AI FLASHCARD MAKER" */}
        <p className="relative uppercase tracking-widest text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 shadow-lg text-right w-full flex items-center justify-end">
          {isClient && (
            <div className="flex space-x-5 mr-4">
              <svg className="text-purple-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-purple-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
            </div>
          )}

          <span>
            AI FLASH-CARD MAKER
          </span>
        </p> 
        {/* Buttons */}
        <div className="flex justify-center items-center">       
          {/* <a href="#" className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition">
            Pricing </a> */}
          <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
            <SignInButton mode="modal">Get Started</SignInButton>  
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
