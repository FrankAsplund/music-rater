"use client";

import { useEffect, useState } from "react";

/* type Album = {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  cover_medium: string;
};

const fetchAlbumData = async () => {
  const response = await fetch("https://api.deezer.com/album/302127");
  const data = await response.json();
  return data as Album;
};

export default function Card() {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumData = await fetchAlbumData();
        setAlbum(albumData);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    fetchData();
  }, []);

  if (!album) {
    return <div>Loading...</div>;
  } */

export default function Card() {
  const searchTerm: string = "your search term"; // Replace with your desired search term

  interface Album {
    collectionId: number;
    collectionName: string;
    artistName: string;
    artworkUrl100: string;
    // Add more properties as needed
  }

  async function searchAlbums(searchTerm: string): Promise<Album[]> {
    const encodedSearchTerm: string = encodeURIComponent(searchTerm);
    const apiUrl: string = `https://itunes.apple.com/search?term=${encodedSearchTerm}&entity=album`;

    try {
      const response: Response = await fetch(apiUrl);
      const data: { results: Album[] } = await response.json();

      return data.results;
    } catch (error) {
      console.error("Error searching albums:", error);
      return [];
    }
  }

  searchAlbums(searchTerm).then((albums: Album[]) => {
    // Handle the album data here
    console.log(albums);
  });

  return (
    <main className="flex min-h-screen flex-col items-center border-solid rounded-md">
      <div className="mt-8">
        <label>
          <span className="mb-2 block text-xl font-medium text-white-700">
            Search for an album
          </span>
        </label>
        <input className="h-8 w-96 p-2 text-black" />
        <button className="w-16 p-2 rounded-md border-white">Search</button>
      </div>
      <div className="bg-#0f172a sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="rounded-md border-white">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              This is what your search returned
            </h2>
          </div>
          <ul
            role="list"
            className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
          >
            <li>
              <div className="flex items-center gap-x-6">
                {/* <img
                  className="h-16 w-16 rounded-full"
                  src={album.cover_medium}
                  alt="Album Cover"
                /> */}
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-white">
                    Album placeholder
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    Artist:
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
