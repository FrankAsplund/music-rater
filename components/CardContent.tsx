"use client";

import React, { useEffect, useState } from "react";

interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  trackCount: string;
  /* ratingIndex: string; */
  /* trackName: string[]; */
  // Add more properties as needed
}

/* interface Tracks {
  trackName: string[];
} */

export default function Card() {
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);
  /* const [tracks, setTracks] = useState<Tracks[]>([]); */

  const handleSearch = async () => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const apiUrl = `https://itunes.apple.com/search?term=${encodedSearchTerm}&entity=album`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setAlbums(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error searching albums:", error);
      setAlbums([]);
    }
  };

  const handleSaveAlbum = (album: Album) => {
    // Retrieve existing collection from local storage
    const existingCollection = localStorage.getItem("albumCollection");
    const collection = existingCollection ? JSON.parse(existingCollection) : [];

    // Add the selected album to the collection
    collection.push(album);

    // Update the collection in local storage
    localStorage.setItem("albumCollection", JSON.stringify(collection));

    console.log(collection);
  };

  const displayLocalStorage = () => {
    const storedCollection = localStorage.getItem("albumCollection");
    const collection: Album[] = storedCollection
      ? JSON.parse(storedCollection)
      : [];

    console.log(collection);
  };

  const handleClearLocalStorage = () => {
    localStorage.clear();

    const storedCollection = localStorage.getItem("albumCollection");
    const collection: Album[] = storedCollection
      ? JSON.parse(storedCollection)
      : [];

    console.log(collection);
  };

  /* const getTracklist = async () => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const apiUrlTrack = `https://itunes.apple.com/search?term=${encodedSearchTerm}&entity=song`;

      const response = await fetch(apiUrlTrack);
      const data = await response.json();

      setAlbums(data.results);
      console.log(data.results);
    } catch (error) {
      console.error("Error searching albums:", error);
      setAlbums([]);
    }
  };
 */

  return (
    <main className="flex min-h-screen flex-col items-center border-solid rounded-md sm:p-2">
      <div className="mt-8">
        <label>
          <span className="mb-2 block text-xl font-medium text-white-700">
            Search for an album
          </span>
        </label>
        <input
          className="h-8 w-64 md:w-96 sm:p-2 text-black"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="w-16 p-2 rounded-md border-white"
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          className="w-16 p-2 rounded-md border-white"
          onClick={() => displayLocalStorage()}
        >
          Display my collection
        </button>

        <button
          className="w-16 p-2 rounded-md border-white"
          onClick={() => handleClearLocalStorage()}
        >
          Clear storage
        </button>
      </div>
      <h2 className="flex justify-center text-3xl mt-4 mb-6 font-bold tracking-tight text-white sm:text-4xl">
        This is what your search returned
      </h2>
      <div className="bg-[#0f172a] rounded-md mt-4 border-white sm:p-8 sm:mx-8 py-8">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:grid-cols-3">
          {albums.length > 0 ? (
            albums.map((album) => (
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

                        <button
                          className="rounded-sm"
                          onClick={() => handleSaveAlbum(album)}
                        >
                          Save to collection
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No albums found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
