import React from "react";

export default function Page() {
  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to the Music Rater
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Here you will be able to rate your favourite albums.
            </p>

            <div className="mt-8">
              <label>
                <span className="mb-2 block text-xl font-medium text-white-700">
                  Search for an album
                </span>
              </label>
              <input className="h-8 w-96 p-2 text-black" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
