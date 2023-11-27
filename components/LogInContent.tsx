import React from "react";

export default function LogIn() {
  return (
    <div>
      <span className="mb-2 block text-xl font-medium text-white-700">
        Username
      </span>
      <input className="h-8 w-64 md:w-96 sm:p-2 text-black" type="text" />
      <span className="mb-2 block text-xl font-medium text-white-700">
        Password
      </span>
      <input className="h-8 w-64 md:w-96 sm:p-2 text-black" type="text" />
      <button
        type="button"
        className="m-2 p-2 rounded-md border-white bg-[#1f2f6b]"
      >
        Log In
      </button>
      <button
        type="button"
        className="m-2 p-2 rounded-md border-white bg-[#1f2f6b]"
      >
        Sign Up
      </button>
    </div>
  );
}
