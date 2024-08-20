import Image from "next/image";
import React, { useState } from "react";

export default function Model({
  isOpen,
  handleCategory,
  handleClose,
  loading,
  handleNote,
  handleLoading
}: {
  isOpen: boolean;
  handleLoading: () => void;
  loading: boolean,
  handleCategory: (category: string) => void;
  handleNote: (note: string) => void;
  handleClose: () => void;
}) {
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  function createSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleCategory(category);
    handleNote(notes);
    handleClose();
  }
  
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 p-10 z-10">
          <div className="bg-white p-8 rounded shadow-lg relative h-full gap-4 grid md:grid-cols-2 overflow-scroll">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 h-5 w-5 text-black"
            >
              &times;
            </button>
            <div className="flex justify-center">
              <Image
                src="/img/dashboardbg.png"
                width={600}
                height={50}
                alt={"dashboard-model-img"}
              />
            </div>
            <form
              onSubmit={createSubmitForm}
              id="flashcard-form"
              className="flex flex-col gap-3 mt-10 h-screen"
            >
              <input
                className="border p-2 outline-none text-black"
                placeholder="Category"
                form="flashcard-form" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <textarea
                value={notes}
                form="flashcard-form" 
                placeholder="your notes goes here"
                onChange={(e) => setNotes(e.target.value)}
                className="h-full resize-none border p-2 outline-none text-black"
              />
              <button disabled={loading} form="flashcard-form" className="bg-black p-3">
                {loading ? "Loading" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
