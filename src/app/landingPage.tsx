export default function Page() {
  return (
    <main className="bg-[url('/img/flashcardlogo.png')] flex w-full flex-col justify-center items-center h-screen">
      <div className="flex justify-center flex-col cursor-default">
        <div 
          className="uppercase tracking-widest text-small text-left text-blue-100 max-w-80">
          Welcome to
        </div>
        <div className="text-blue-400 text-5xl md:text-6xl font-bold text-center uppercase">
        SNAP LEARN AI
        </div>
        <p className="text-blue-200 text-right">
          AI FLASHCARD MAKER
        </p>
      </div>
    </main>
  );
}