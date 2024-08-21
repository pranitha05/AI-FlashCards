"use client";
import { RedirectToSignIn, useSession } from "@clerk/nextjs";
import { useState } from "react";
import Model from "./components/Model";
import DeleteModel from "./components/DeleteModel";
import { createBatchNotes } from "./lib/firebase/utils/functions";


type Flashcard = {
  category: string;
  content: {
    question: string;
    answer: string;
  }[];
}[];

// Ensure this is in page.tsx
export type FlashcardRaw = {
  category: string;
  content: {
    question: string;
    answer: string;
  }[];
};



const defaultFlashCardData: Flashcard = [];
export default function Page() {
  const { session, isSignedIn } = useSession();
  const [isModel, setIsModel] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFlashcardData, setSelectedFlashcardData] = useState<FlashcardRaw | null>(null);

  const [data, setData] = useState<Flashcard>(defaultFlashCardData);

  if (!isSignedIn) return <RedirectToSignIn />;

  async function makeAIRequest(notes: string) {
    const ctx = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ data: notes }),
    });
    const res = await ctx.json();
    const response = JSON.parse(res.message);
    if (res.statusCode === 200) {
      setData((prev) => [
        ...prev,
        { category: response.category, content: response.flashcards },
      ]);
      await createBatchNotes(response, session!.user.id);
      handleClose();
    }
  }

  const handleClose = () => setIsModel(false);

  const handleLoading = () => setLoading((prev) => !prev);

  async function handleButtonSubmit() {
    setIsModel((prev) => !prev);
    setLoading(false);
  }

  const handleDelete = (category: string, flashcardData: FlashcardRaw) => {
    setSelectedCategory(category);
    setSelectedFlashcardData(flashcardData);
    setIsDeleteModel(true);
  };


//cant figure out how to delete the whole flash card, need to figure it out 
  return (
    <main
      className={`bg-gradient-to-b from-blue-200 to-blue-500 min-h-screen flex flex-col justify-center items-center relative z-10`}
    >
      <div className="text-center mt-20">
        {isModel && (
          <Model
            isOpen={isModel}
            makeRequest={makeAIRequest}
            handleClose={handleClose}
            handleLoading={handleLoading}
            loading={loading}
          />
        )}
        {isDeleteModel && selectedCategory && selectedFlashcardData && (
          <DeleteModel
            isOpen={isDeleteModel}
            handleOpen={() => setIsDeleteModel(true)}
            handleClose={() => setIsDeleteModel(false)}
            data={selectedFlashcardData}
            userId={session!.user.id}
          />
        )}
        
        <h1 className="text-3xl font-bold uppercase py-1 mb-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
          Welcome back, {session.user.fullName}
        </h1>
        <button
          onClick={handleButtonSubmit}
          className="text-white font-bold text-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-500 transition duration-300"
        >
          Create Flashcard
        </button>
      </div>
      
      <div className="flex-grow w-full">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.category} className="flex justify-center my-10 flex-col">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mx-10 uppercase text-white drop-shadow-lg">
                  {item.category}
                </h1>
                <button
                  onClick={() => handleDelete(item.category, item)}
                  className="text-white font-bold bg-red-600 p-2 rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
              <div className="grid md:grid-cols-4 gap-6 mx-10 my-10">
                {item.content.length > 0 &&
                  item.content.map((r) => (
                    <div
                      key={r.question}
                      className="relative group rounded-lg bg-black h-40 justify-center flex items-center shadow-xl transform hover:scale-105 transition-transform duration-300"
                    >
                      <span className="text-white text-lg">{r.question}</span>
                      <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg">{r.answer}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))
        ) : (
          <div className="h-screen flex justify-center items-center">
            <p className="text-white text-2xl font-bold">No flashcards available</p>
          </div>
        )}
      </div>
    </main>
  );
}
