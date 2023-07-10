"use client";

import React, { useEffect, useState } from "react";

interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  trackCount: string;
}

export default function Collection() {
  // Retrieve existing collection from local storage
  const storedCollection = localStorage.getItem("albumCollection");
  const collection: Album[] = storedCollection
    ? JSON.parse(storedCollection)
    : [];

  console.log(collection);

  const displayLocalStorage = async () => {
    console.log("collection: ", collection);
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();
    console.log(collection);
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col justify-center items-center lg:px-24 md:p-8 sm:p-2 mx-2 my-6">
        <div className="mx-auto lg:px-8 max-w-4xl lg:mx-0">
          <h2 className="flex text-4xl font-bold tracking-tight justify-center text-white sm:text-6xl">
            My collection
          </h2>
          <p className="flex mt-6 text-lg leading-8 justify-center text-gray-300">
            Here are all the album's you've saved to your collection.
          </p>

          <div className="flex flex-row justify-center items-center border-solid rounded-md sm:p-2">
            <button
              onClick={() => displayLocalStorage()}
              className="m-2 p-2 rounded-md border-white bg-[#1f2f6b]"
            >
              Display my collection
            </button>

            <button
              onClick={() => handleClearLocalStorage()}
              className="m-2 p-2 rounded-md border-white bg-[#1f2f6b]"
            >
              Clear storage
            </button>
          </div>

          <div className="bg-[#0f172a] rounded-md mt-4 border-white sm:p-8 sm:mx-8 py-8">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:grid-cols-3">
              {collection.length > 0 ? (
                collection.map((album) => (
                  <div key={album.collectionId}>
                    <ul
                      role="list"
                      className="grid gap-x-8 gap-y-2 sm:gap-y-4 xl:col-span-2"
                    >
                      <li>
                        <div className="flex flex-wrap gap-x-6 hover:ring-white-300 rounded-md border-white">
                          <img
                            className="h-32 w-32 mb-2 rounded-md"
                            src={album.artworkUrl100}
                            alt={album.collectionName}
                          />
                          <div>
                            <h3 className="text-base font-semibold leading-7 tracking-tight text-white">
                              Album: {album.collectionName}
                            </h3>
                            <p className="text-sm font-semibold leading-6 text-white-600">
                              Artist: {album.artistName}
                            </p>
                            <p className="text-sm font-semibold leading-6 text-white-600">
                              Tracks: {album.trackCount}
                            </p>

                            <button className="my-1 px-2 rounded-md border-white bg-[#1f2f6b]">
                              Rate album
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))
              ) : (
                <p>No albums in your collection.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
