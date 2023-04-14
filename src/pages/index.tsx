import React from "react";
import Link from "next/link";

const IndexPage: React.FC = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/backgrounds/1.jpg')" }}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-60 rounded-lg p-8 space-y-4 backdrop-blur-md bg-opacity-40">
          <h1 className="text-4xl font-bold text-center">Auto D&D</h1>
          <Link href="/new/campaign">
            <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              New Game
            </button>
          </Link>
          <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Continue
          </button>
          <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
