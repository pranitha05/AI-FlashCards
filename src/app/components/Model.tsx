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
  loading: boolean;
  handleClose: () => void;
  makeRequest: (notes: string) => Promise<void>;
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900 transition duration-300"
            >
              &times;
            </button>
            <div className="flex justify-center mb-4">
              <Image
                src="/img/dashboardbg.png"
                width={600}
                height={50}
                alt="dashboard-model-img"
                className="rounded-lg shadow-md"
              />
            </div>
            <form id="flashcard-form" className="flex flex-col gap-4">
              <textarea
                value={notes}
                placeholder="Your notes go here"
                onChange={(e) => setNotes(e.target.value)}
                className="h-40 resize-none border border-gray-300 p-3 rounded-lg outline-none text-black bg-gray-100 focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <button
                disabled={loading}
                onClick={handleSubmit}
                className={`w-full py-3 rounded-lg font-semibold text-white ${
                  loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 transition duration-300"
                }`}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
