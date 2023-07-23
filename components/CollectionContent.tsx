"use client";

import React, { useEffect, useState } from "react";

interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  trackCount: string;
}

interface Track {
  trackName: string;
  rating: number;
}

const CollectionContent: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);

  const storedCollection = localStorage.getItem("albumCollection");
  const collection: Album[] = storedCollection
    ? JSON.parse(storedCollection)
    : [];

  const handleGetTracklist = async (collectionId: number) => {
    try {
      const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const fetchedTracks: Track[] = data.results
        .filter((result: any) => result.wrapperType === "track")
        .map((result: any) => ({
          trackName: result.trackName,
          rating: 0, // Initialize the rating to 0
        }));

      setTracks(fetchedTracks);
    } catch (error) {
      console.error("Error fetching tracklist:", error);
      setTracks([]);
    }
  };

  const handleRateTrack = (index: number, rating: number) => {
    setTracks((prevTracks) => {
      const updatedTracks = [...prevTracks];
      updatedTracks[index].rating = rating;
      return updatedTracks;
    });
  };

  const calculateAverageScore = () => {
    if (tracks.length === 0) {
      return 0;
    }

    const totalScore = tracks.reduce((sum, track) => sum + track.rating, 0);
    const averageScore = totalScore / tracks.length;

    return Math.round(averageScore * 10) / 10;
  };

  const averageScore = calculateAverageScore();

  // Function to retrieve album scores from localStorage
  const getSavedAlbumScores = () => {
    const storedAlbumScores = localStorage.getItem("albumScores");
    if (storedAlbumScores) {
      const parsedAlbumScores: Track[] = JSON.parse(storedAlbumScores);
      setTracks(parsedAlbumScores);
    }
  };

  // Effect hook to fetch saved album scores when the component mounts
  useEffect(() => {
    getSavedAlbumScores();
  }, []);

  const saveAlbumScores = () => {
    localStorage.setItem("albumScores", JSON.stringify(tracks));
  };

  return (
    <div>
      <main className="flex min-h-screen flex-col justify-center items-center lg:px-24 md:p-8 sm:p-2 mx-2 my-6">
        <div className="mx-auto lg:px-8 max-w-4xl lg:mx-0">
          <h2 className="flex text-4xl font-bold tracking-tight justify-center text-white sm:text-6xl">
            My collection
          </h2>
          <p className="flex mt-6 text-lg leading-8 justify-center text-gray-300">
            Here are all the albums you've saved to your collection.
          </p>

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

                            <button
                              onClick={() =>
                                handleGetTracklist(album.collectionId)
                              }
                              className="my-1 px-2 rounded-md border-white bg-[#1f2f6b]"
                            >
                              Fetch tracklist
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

          <div className="bg-[#0f172a] rounded-md mt-4 border-white sm:p-8 sm:mx-8 py-8">
            {tracks.length > 0 && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-white">
                  Tracklist for the selected album
                </h2>
                <ul className="grid gap-2 mt-2">
                  {tracks.map((track, index) => (
                    <li key={track.trackName} className="text-white">
                      {track.trackName}
                      <input
                        className="text-black rounded-md mx-2 sm:px-1"
                        type="number"
                        min={1}
                        max={10}
                        value={track.rating}
                        onChange={(e) =>
                          handleRateTrack(index, parseInt(e.target.value))
                        }
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white">
                Average score for the Album
              </h2>
              <p className="flex text-xl leading-8 text-gray-300">
                {averageScore}
              </p>
              <button
                className="my-1 px-2 rounded-md border-white bg-[#1f2f6b]"
                onClick={saveAlbumScores}
              >
                Save score
              </button>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-white">
                Your saved rating of the album
              </h2>
              <p className="flex text-xl leading-8 text-gray-300">
                {/* {averageScore} */}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectionContent;
