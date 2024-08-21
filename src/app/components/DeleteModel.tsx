import React, { useState } from "react";
import { FlashcardRaw } from "../page";
import { updateFlashcard } from "../lib/firebase/utils/functions";

type Flashcard = {
  question: string;
  answer: string;
};

export default function DeleteModel({
  isOpen,
  handleOpen,
  handleClose,
  data,
  userId
}: {
  handleClose: () => void;
  userId: string;
  isOpen: boolean;
  handleOpen: () => void;
  data: FlashcardRaw;
}) {
  const [select, setSelect] = useState<string>("");

  async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (select) {
      data.content = data.content.filter((evt: Flashcard) => evt.question !== select);
      await updateFlashcard(userId, data.category, data);
      handleClose();
    }
  }

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 p-10 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg relative w-full max-w-md">
            <button 
              onClick={handleClose} 
              className="absolute top-3 right-3 text-xl hover:text-gray-400 transition-colors"
            >
              &times;
            </button>
            <h1 className="text-2xl font-bold mb-4">{data.category}</h1>
            <h2 className="text-lg mb-4">Select which card to delete</h2>
            <div className="flex flex-col gap-2">
              {data.content.map((evt: Flashcard) => (
                <div
                  key={evt.question}
                  onClick={() => setSelect(evt.question)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors 
                    ${select === evt.question ? "bg-red-600" : "bg-gray-800"}
                    hover:bg-red-700`}
                >
                  {evt.question}
                </div>
              ))}
            </div>
            <button 
              onClick={handleSubmit} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
