"use client";
import { RedirectToSignIn, useSession } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Model from "./components/Model";
import { createBatchNotes, getBatchNotes } from "./lib/firebase/utils/functions";

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
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<Flashcard>(defaultFlashCardData);

  if (!isSignedIn) return <RedirectToSignIn />;


  async function makeAIRequest(notes: string) {
    const ctx = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ data: notes }),
    });
    const res = await ctx.json();
    const response = (JSON.parse(res.message))
    if (res.statusCode === 200) {
      setData((prev) => [
        ...prev,
        { category: response.category, content: response.flashcards },
      ]);
      await createBatchNotes(response, session!.user.id)
      handleClose()
    }
  }

  const handleClose = () => setisModel(false)

  const handleLoading = () => setLoading((prev) => !prev)

  async function handleButtonSubmit() {
    setisModel((prev) => !prev);
    setLoading(false)
  }

  return (
    <main
      className={`bg-light-blue ${
        data.length > 0 ? "h-full" : "h-full"
      }  relative z-10`}
    >
      <div className="bg-white">
        {isModel && (
          <Model
            isOpen={isModel}

            makeRequest={makeAIRequest}
            handleClose={handleClose}
            handleLoading={handleLoading}
            loading={loading}
          />
        )}
        <div className="p-20 md:p-16 flex justify-between md:flex-row flex-col items-center gap-4 ">
          <h1 className="text-2xl text-black font-bold uppercase py-1">
            Welcome back {session.user.fullName}
          </h1>
          <button
            onClick={handleButtonSubmit}
            className="text-white font-bold text-xl bg-black p-2 rounded md:w-fit w-full"
          >
            Create Flashcard
          </button>
        </div>
      </div>
      <div>
        {data.length > 0 ? (
          data.map((data) => {
            return (
              <div
                key={data.category}
                className="flex justify-center my-10 flex-col"
              >
                <h1 className="text-2xl font-bold mx-10 uppercase">
                  {data.category}
                </h1>
                <div className="grid md:grid-cols-4  gap-4  mx-10 my-10">
                  {data.content.length > 0 &&
                    data.content.map((r) => {
                      return (
                        <div
                          key={r.question}
                          className="relative group rounded bg-black h-40 justify-center flex items-center"
                        >
                          <span className="text-white">{r.question}</span>
                          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white">{r.answer}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-screen flex justify-center items-center">
            No flashcard
          </div>
        )}
      </div>
    </main>
  );
}
