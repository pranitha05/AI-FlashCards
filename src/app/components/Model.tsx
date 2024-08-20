import Image from "next/image";
import React, { useState } from "react";

export default function Model({
  isOpen,
  handleClose,
  loading,
  handleLoading,
  makeRequest,
}: {
  isOpen: boolean;
  handleLoading: () => void;
  loading: boolean,
  handleClose: () => void;
  makeRequest: (notes: string) => Promise<void>
}) {
  const [notes, setNotes] = useState("");
  
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleLoading();
    await makeRequest(notes);
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
              id="flashcard-form"
              className="flex flex-col gap-3 mt-10 h-screen"
            >
              <textarea
                value={notes}
                form="flashcard-form" 
                placeholder="your notes goes here"
                onChange={(e) => setNotes(e.target.value)}
                className="h-full resize-none border p-2 outline-none text-black"
              />
              <button disabled={loading} onClick={handleSubmit} form="flashcard-form" className="border bg-black p-3 w-full">
                {loading ? "Loading" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
