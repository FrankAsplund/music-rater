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
  /* const [albums, setAlbums] = useState<Album[]>([]); */
  /* const [collection, setCollection] = useState<Album[]>([]); */

  // Retrieve existing collection from local storage
  const storedCollection = localStorage.getItem("albumCollection");
  const collection: Album[] = storedCollection
    ? JSON.parse(storedCollection)
    : [];

  /* setAlbums(storedCollection ? JSON.parse(storedCollection) : []); */

  const handleGetAlbums = async () => {
    /* collection.push(albums); */

    console.log(collection);
    /* console.log(albums); */
  };

  const handleClearLocalStorage = () => {
    /* localStorage.clear(); */

    console.log(collection);

    // Additional logic or state updates after clearing local storage
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col justify-center items-center lg:p-24 md:p-8 sm:p-2 mx-2 my-6">
        <div className="mx-auto lg:px-8 max-w-4xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight  text-white sm:text-6xl">
            My collection
          </h2>
          <p className="flex mt-6 text-lg leading-8 justify-center text-gray-300">
            Here are all the album's you've saved to your collection.
          </p>

          <button onClick={() => handleGetAlbums()}>
            Display my collection
          </button>

          <button onClick={() => handleClearLocalStorage()}>
            Clear storage
          </button>

          {/* <div className="bg-[#0f172a] rounded-md mt-4 border-white sm:p-8 sm:mx-8 py-8">
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
          </div> */}
        </div>
      </main>
    </div>
  );
}
