import React from 'react';
import Image from 'next/image';

export default function NewPage() {
  return (
    <div className="relative h-screen w-full bg-blue-500" style={{ backgroundColor: '#68c7ff' }}>
      {/* Top Right Corner - Navigation */}
      <div className="absolute top-4 right-4 flex space-x-8">
        <a href="/flashcards" className="text-[#df608f] text-[14px] font-poppins">
          MY FLASHCARDS
        </a>
        <a href="/profile" className="text-[#df608f] text-[14px] font-poppins">
          MY PROFILE
        </a>
      </div>

      {/* Page Content */}
      <div className="flex h-full">
        {/* Left Half - GIF Animation */}
        <div className="w-1/2 flex items-center justify-center">
          <Image
            src="/img/dashboardbg.png"
            alt="Animation"
            width={500}
            height={500}
            className="object-contain"
          />
        </div>

        {/* Right Half - Upload Section */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center">
          <h1 className="text-[#004b84] text-[64px] font-poppins mb-8">
            Upload your notes
          </h1>

          {/* Upload Button */}
          <div className="mb-8">
            <button className="px-8 py-3 border border-solid border-white rounded bg-white text-[#df608f] text-[14px] font-poppins">
              Upload
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-3/4 bg-gray-300 rounded-full h-4">
            <div className="bg-[#df608f] h-4 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
