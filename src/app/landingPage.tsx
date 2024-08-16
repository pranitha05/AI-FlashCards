import Image from 'next/image';

export default function Page() {
  return (
    <div className="bg-[url('/img/flashcardlogo.png')] relative h-screen w-full overflow-hidden bg-cover bg-center">

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl text-white font-bold font-cocoGothic mb-4">
          WELCOME TO
        </h1>
        <h2 className="text-[106px] text-white font-bold font-catchyMager mb-4">
          SNAP LEARN AI
        </h2>
        <h3 className="text-[36px] text-white font-normal font-catchyMager mb-8">
          AI FLASHCARD MAKER
        </h3>

        {/* Create Flashcards Button */}
        <a href="/login" className="px-8 py-3 border border-solid border-white rounded bg-white text-[#df608f] text-[14px] font-poppins">
          CREATE FLASHCARDS
        </a>
      </div>
    </div>
  );
}
