import React from "react";

export default function LogIn() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center lg:p-24 md:p-8 sm:p-2 mx-2 my-6">
        <h2 className="text-4xl font-bold tracking-tight  text-white sm:text-6xl">
          Log in, or sign up for an account
        </h2>
        <div className="justify-start lg:p-12 md:p-8 sm:p-2 mx-2 my-6">
          <span className="mb-2 block text-xl font-medium text-white-700">
            Username
          </span>
          <input className="h-8 w-64 md:w-96 sm:p-2 text-black" type="text" />
          <span className="mb-2 block text-xl font-medium text-white-700">
            Password
          </span>
          <input className="h-8 w-64 md:w-96 sm:p-2 text-black" type="text" />
          <div className="flex-start my-2">
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
        </div>
      </main>
    </div>
  );
}
