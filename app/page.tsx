import React, { useEffect } from "react";
import Card from "../components/Card";

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

            <div>
              <Card />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
