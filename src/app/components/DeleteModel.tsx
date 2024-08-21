import React, { useState } from "react";
import { FlashcardRaw } from "../page";
import { updateFlashcard } from "../lib/firebase/utils/functions";

export default function DeleteModel({ isOpen, handleOpen, handleClose, data, userId }: { handleClose: () => void, userId: string, isOpen: boolean, handleOpen: () => void, data: FlashcardRaw }) {
const [select, setSelect] = useState('');

async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    data.flashcards = data.flashcards.filter(evt => evt.question !== select);
    await updateFlashcard(userId, data.id, data).then(() => handleClose());
}

return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-20 md:p-40 z-10">
          <div className="bg-white p-10 rounded shadow-lg relative  h-full gap-4 overflow-auto">
            <button onClick={handleOpen} className="absolute top-2 right-2 h-5 w-5 text-black">
              &times;
            </button>
            <form
              id="flashcard-form"
              className="flex flex-col items-center gap-3 mt-10 h-screen text-black"
            >
                <h1 className="font-bold text-2xl">{data.category}</h1>
                <h2 className="text-md">Select which card to delete from review</h2>
                {data.flashcards.map(evt => (
                    <div key={evt.question} onClick={() => setSelect(evt.question)} className={`w-full border hover:cursor-pointer ${select === evt.question ? "bg-blue-400" : "bg-white"} rounded p-2`}>{evt.question}</div>
                ))}
                <button onClick={handleSubmit} form="flashcard-form" className="border bg-black w-full p-2 text-white">Delete</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
