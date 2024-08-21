"use client";
import { RedirectToSignIn, useAuth, useSession } from "@clerk/nextjs";
import { MouseEvent, useEffect, useState } from "react";
import Model from "./components/Model";
import {
  createBatchNotes,
  deleteFlashcard,
  getBatchNotes,
} from "./lib/firebase/utils/functions";
import DeleteModel from "./components/DeleteModel";
export type Flashcard = {
  id: string;
  category: string;
  flashcards: {
    question: string;
    answer: string;
  }[];
}[];

export type FlashcardRaw = {
  id: string
  category: string;
  flashcards: {
    question: string;
    answer: string;
  }[];
};

const defaultFlashCardData: Flashcard = [];
export default function Page() {
  const { session, isSignedIn } = useSession();
  const [isModel, setisModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeleteModelOpen, setisDeleteModelOpen] = useState(false);
  const { userId, isLoaded } = useAuth();

  const [data, setData] = useState<Flashcard>(defaultFlashCardData);
  const [selectedData, setSelectedData] = useState<FlashcardRaw>({
    category: "",
    flashcards: [],
    id: ""
  });


  
  useEffect(() => {
    const res = async () => {
      const response = await getBatchNotes(userId as string);
      setData(response.filter(res => res.flashcards));
    };
    res();

  }, [isLoaded, isSignedIn, userId]);

  if (!isSignedIn) return <RedirectToSignIn />;

  async function makeAIRequest(notes: string) {
    const ctx = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ data: notes }),
    });
    const res = await ctx.json();
    const response = JSON.parse(res.message);
    if (res.statusCode === 200) {
      const id = await createBatchNotes(response, session!.user.id);
      setData((prev) => [
        ...prev,
        { category: response.category, flashcards: response.flashcards, id },
      ]);
      handleClose();
    }
    if (res.statusCode === 500) {
      await makeAIRequest(notes);
    }
  }

  const handleClose = () => setisModel(false);

  const handleLoading = () => setLoading((prev) => !prev);

  async function handleButtonSubmit() {
    setisModel((prev) => !prev);
    setLoading(false);
  }

  function handleDelete(
    evt: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    data: FlashcardRaw
  ) {
    evt.preventDefault();
    setSelectedData(data);
    setisDeleteModelOpen(true);
    console.log(data);
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
        {isDeleteModelOpen && (
          <DeleteModel
            data={selectedData}
            handleClose={() => setisDeleteModelOpen(false)}
            userId={session.user.id}
            isOpen={isDeleteModelOpen}
            handleOpen={() => setisDeleteModelOpen((prev) => !prev)}
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
                <div className="flex w-full items-center justify-between">
                  <h1 className="p-0 text-2xl font-bold mx-10 uppercase">
                    {data.category}
                  </h1>
                  <button
                    onClick={(e) => handleDelete(e, data)}
                    className=" mr-10 p-1 rounded text-xl bg-black border"
                  >
                    Delete
                  </button>
                </div>
                <div className="grid md:grid-cols-4  gap-4  mx-10 my-10">
                  {data && data.flashcards.map((r) => {
                      return (
                        <div
                          key={r.question}
                          className="relative group p-5 text-sm rounded bg-black h-40 justify-center flex items-center"
                        >
                          <span className="text-white">{r.question}</span>
                          <div className="absolute inset-0  p-5 text-sm  bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
