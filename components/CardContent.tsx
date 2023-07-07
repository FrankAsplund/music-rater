"use client";

import { useEffect, useState } from "react";

interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  // Add more properties as needed
}

export default function Card() {
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState<Album[]>([]);

  const handleSearch = async () => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const apiUrl = `https://itunes.apple.com/search?term=${encodedSearchTerm}&entity=album`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      setAlbums(data.results);
      console.log(data.results);
      console.log(albums);
    } catch (error) {
      console.error("Error searching albums:", error);
      setAlbums([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center border-solid rounded-md">
      <div className="mt-8">
        <label>
          <span className="mb-2 block text-xl font-medium text-white-700">
            Search for an album
          </span>
        </label>
        <input
          className="h-8 w-96 p-2 text-black"
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
      </div>
      <div className="bg-#0f172a sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="rounded-md border-white">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              This is what your search returned
            </h2>
          </div>

          {albums.map((album) => (
            <div key={album.collectionId}>
              <ul
                role="list"
                className="grid gap-x-8 gap-y-4 sm:gap-y-4 xl:col-span-2"
              >
                <li>
                  <div className="flex flex-wrap gap-x-6">
                    <img
                      className="h-16 w-16 rounded-full"
                      src={album.artworkUrl100}
                      alt={album.collectionName}
                    />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-white">
                        {album.collectionName}
                      </h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">
                        {album.artistName}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
