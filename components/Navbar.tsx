import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white">
              <Link
                href="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Music Rater
              </Link>
            </span>
          </div>
          <div className="flex">
            <Link
              href="/"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Log In
            </Link>
            <Link
              href="/collection"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              My Collection
            </Link>
            <Link
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
