"use client";

import { useEffect, useState } from 'react';
import { SignedOut, SignInButton, SignedIn, UserButton } from '@clerk/nextjs';

const Page: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [messageState, setMessageState] = useState({
    success: false,
    error: false,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessageState({ success: true, error: false });
        form.reset(); // Resetting the form fields

        // Resetting the state
        setFormState({
          name: '',
          email: '',
          phone: '',
          message: '',
        });

        setTimeout(() => setMessageState({ success: false, error: false }), 10000);
      } else {
        setMessageState({ success: false, error: true });
        setTimeout(() => setMessageState({ success: false, error: false }), 10000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setMessageState({ success: false, error: true });
      setTimeout(() => setMessageState({ success: false, error: false }), 10000);
    }
  };

  return (
    <>
      {/* Main Section with Background Image */}
      <main className="relative bg-[url('/img/flashcardlogo.png')] flex w-full flex-col justify-center items-center h-screen">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-55"></div>

        <section className="relative flex justify-center flex-col cursor-default z-10">
          {/* "Welcome to" */}
          <div className="relative uppercase tracking-widest text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-4 shadow-lg flex items-center">
            <span className="mr-4">Welcome to</span>
            <div className="flex space-x-5">
              <svg className="text-yellow-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-yellow-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
              <svg className="text-yellow-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="4" fill="currentColor"/>
              </svg>
            </div>
          </div>

          {/* "SNAP LEARN AI" */}
          <div className="text-[5rem] md:text-[6rem] bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold uppercase mb-4 shadow-lg">
            SNAP LEARN-AI
          </div>

          {/* "AI FLASHCARD MAKER" */}
          <p className="relative uppercase tracking-widest text-2xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold mb-8 shadow-lg text-right w-full flex items-center justify-end">
            {isClient && (
              <div className="flex space-x-5 mr-4">
                <svg className="text-purple-400" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg className="text-purple-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
                <svg className="text-purple-600" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="4" fill="currentColor"/>
                </svg>
              </div>
            )}

            <span>
              AI FLASH-CARD MAKER
            </span>
          </p>

          {/* Buttons */}
          <div className="flex justify-center items-center">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-800 transition">
              <SignInButton mode="modal">Get Started</SignInButton>
            </div>
          </div>
        </section>
      </main>

      {/* Container for Left and Right Sections */}
      <section className="flex w-full min-h-screen">

      {/* About Section */}
      <div className="flex-1 flex items-center justify-center bg-white p-6 shadow-lg rounded-lg-0">
        <div className="text-center">
          {/* About Section Title */}
          <div className="uppercase tracking-widest text-xl md:text-2xl lg:text-3xl text-gray-800 font-semibold mb-4">
            About Us
          </div>

          {/* About Section Content */}
          <p className="text-sm md:text-base lg:text-lg text-gray-600 mb-4">
            Welcome to <span className="font-semibold text-purple-600">SNAP LEARN-AI</span>! We are dedicated to providing innovative AI solutions through our powerful flashcard maker. Our mission is to make learning more engaging and effective with cutting-edge technology. Whether you're a student, educator, or lifelong learner, our platform enhances your educational experience with intuitive tools.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex gap-4 justify-center">
            <a
              href="#contact"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300 text-sm md:text-base"
            >
              Contact
            </a>
           
          </div>
        </div>
      </div>

        {/* Right Section */}
        
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
          <div className="relative w-full h-full flex justify-center items-center p-6">
            <div className="relative flex justify-center items-center w-4/5 h-4/5 md:w-3/4 md:h-3/4">
              
              {/* Flashcard 1 */}
              <div className="absolute bg-white rounded-lg shadow-2xl transform translate-x-0 translate-y-0 w-full h-full p-6 flex flex-col items-center z-30">
                <img
                  src="/img/flashcardlogo.png"
                  alt="AI Flashcard Logo"
                  className="w-full h-3/4 object-cover mb-4 rounded-t-lg"
                />
                <p className="text-center uppercase tracking-widest text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent font-bold">
                  AI FLASH CARD MAKER
                </p>
              </div>

              {/* Flashcard 2 */}

              <div className="absolute bg-white rounded-lg shadow-2xl transform -translate-x-2 -translate-y-2 w-full h-full p-6 flex flex-col items-center z-20"></div>
              
              {/* Flashcard 3 */}
              <div className="absolute bg-white rounded-lg shadow-2xl transform -translate-x-4 -translate-y-4 w-full h-full p-6 flex flex-col items-center z-10"></div>
            </div>
          </div>
        </div>

      </section>

      {/* Creators Section */}
      
      <section className="relative bg-[url('/img/flashcardlogo.png')] bg-cover bg-center flex w-full flex-col items-center min-h-screen py-10 px-4">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white bg-clip-text text-transparent font-bold uppercase mb-8 shadow-lg text-center">Meet the Creators</h2>

          <div className="flex flex-wrap gap-8 justify-center">
            {/* Creator 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs md:max-w-sm lg:max-w-md text-center">
              <img src="/img/creator1.jpg" alt="Creator 1" className="w-32 h-32 object-cover rounded-full mx-auto mb-4"/>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Minh Le</h3>
              <p className="text-gray-600">Front-end Development</p>
            </div>

            {/* Creator 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs md:max-w-sm lg:max-w-md text-center">
              <img src="/img/creator2.jpg" alt="Creator 2" className="w-32 h-32 object-cover rounded-full mx-auto mb-4"/>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Pranitha Ramaswamy</h3>
              <p className="text-gray-600">UI/UX Designer</p>
            </div>

            {/* Creator 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-xs md:max-w-sm lg:max-w-md text-center">
              <img src="/img/creator4.png" alt="Creator 3" className="w-32 h-32 object-cover rounded-full mx-auto mb-4"/>
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Bi Rong Liu</h3>
              <p className="text-gray-600">Automation & DevOps Engineer</p>
            </div>
          </div>
        </div>
      </section>


        {/* Contact Section */}
        <section id="contact" className="relative bg-gray-100 flex flex-col items-center justify-center min-h-screen py-10 px-4">
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-100 opacity-50"></div>

          <div className="relative z-10 bg-white shadow-xl rounded-lg p-6 md:p-8 lg:p-12 max-w-md md:max-w-lg lg:max-w-4xl w-full">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 md:mb-8 text-center">Contact Us Here</h2>
            
            {messageState.success && (

              <div className="bg-green-100 text-green-800 p-4 mb-6 rounded-lg shadow-md">
                <p>Thank you for contacting us! We will get back to you soon.</p>
              </div>
            )}
            {messageState.error && (

              <div className="bg-red-100 text-red-800 p-4 mb-6 rounded-lg shadow-md">
                <p>There was an error sending your message. Please try again later.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>


                <label htmlFor="name" className="block text-gray-700 text-sm md:text-base font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>


              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm md:text-base font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  required
                />
              </div>


              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm md:text-base font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 text-sm md:text-base font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>


    </>
  );
};

export default Page;