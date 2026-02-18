import React from "react";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8 animate-bounce">
          <FaExclamationTriangle className="text-yellow-500 text-9xl inline-block" />
        </div>
        <h1 className="font-bold mb-8 text-white">404 - Page Not Found</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          {`Oops! It seems you've ventured into uncharted territory. The page
          you're looking for doesn't exist in this digital realm.`}
        </p>
        <div className="flex gap-4 flex-col md:flex-row md:justify-center">
          <Link
            href={"/"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto"
          >
            <FaHome className="mr-2" />
            Return Home
          </Link>
          <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out flex items-center justify-center w-full md:w-auto">
            <FaRedo className="mr-2" />
            Try Again
          </button>
        </div>
        <div className="mt-12 text-gray-500">
          <p>Error Code: 0x404</p>
          <p>If you believe this is a mistake, please contact support.</p>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
