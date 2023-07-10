import React, { useEffect } from "react";
import Card from "../components/Card";

export default function Page() {
  return (
    <div>
      <main className="flex min-h-screen flex-col justify-center items-center lg:p-24 md:p-8 sm:p-2 mx-2 my-6">
        <div className="mx-auto lg:px-8 max-w-4xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight  text-white sm:text-6xl">
            Welcome to the Music Rater
          </h2>
          <p className="flex mt-6 text-lg leading-8 justify-center text-gray-300">
            Here you will be able to rate your favourite albums.
          </p>

          <div>
            <Card />
          </div>
        </div>
      </main>
    </div>
  );
}
