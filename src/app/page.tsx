
"use client";
import { RedirectToSignIn, useSession } from "@clerk/nextjs";
import { useState } from "react";
import Model from "./components/Model";
import { createBatchNotes } from "./lib/firebase/utils/functions";

type Flashcard = {
  category: string;
  content: {
    question: string;
    answer: string;
  }[];
}[];

type FlashcardRaw = {
  category: string;
  content: {
    question: string;
    answer: string;
  }[];
};

const createFlashcard = async (data: FlashcardRaw, userId: string) => {
  const ctx = await fetch("/api/flashcard", {
    method: "POST",
    body: JSON.stringify({
      userId,
      data: { category: data.category, content: data.content },
    }),
  });
  const response = await ctx.json();
  return response;
};

const defaultFlashCardData: Flashcard = [];
export default function Page() {
  const { session, isSignedIn } = useSession();
  const [isModel, setisModel] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const handleClose = () => setisModel(false);

  const handleLoading = () => setLoading((prev) => !prev);

  async function handleButtonSubmit() {
    setisModel((prev) => !prev);
    setLoading(false);
  }

  return (
    <main className="relative bg-[url('/img/flashcardlogo.png')] flex flex-col justify-between items-center h-screen text-white">
      {isModel && (
        <Model
          isOpen={isModel}
          makeRequest={makeAIRequest}
          handleClose={handleClose}
          handleLoading={handleLoading}
          loading={loading}
        />
      )}

    <div className="mt-32 flex flex-col justify-center items-center p-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-opacity-80 rounded-lg shadow-lg mb-6 w-full max-w-md text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase mb-4">
          Welcome back, {session.user.fullName}
        </h1>
        <button
          onClick={handleButtonSubmit}
          className="bg-white text-blue-600 font-semibold text-lg md:text-xl py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition duration-300"
        >
          Create Flashcard
        </button>
      </div>

      <div className="flex-grow w-full max-w-5xl p-4">
        {data.length > 0 ? (
          <div className="flex flex-col items-center">
            {data.map((data) => (
              <div
                key={data.category}
                className="w-full bg-white rounded-lg shadow-lg mb-8 p-4"
              >
                <h1 className="text-2xl font-bold mb-4 text-center uppercase">
                  {data.category}
                </h1>
                <div className="grid md:grid-cols-4 gap-4">
                  {data.content.length > 0 &&
                    data.content.map((r) => (
                      <div
                        key={r.question}
                        className="relative group rounded-lg bg-gray-800 text-white h-40 flex items-center justify-center overflow-hidden"
                      >
                        <span className="text-lg font-medium p-4">{r.question}</span>
                        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-lg font-medium p-4">{r.answer}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex justify-center items-center text-gray-300 text-lg">
            No flashcards
          </div>
        )}
      </div>
    </main>
  );
}
