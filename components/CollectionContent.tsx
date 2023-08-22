"use client";

import React, { useEffect, useState } from "react";

interface Album {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  trackCount: string;
  userRating: number;
}

interface Track {
  trackName: string;
  rating: number;
}

interface TrackRatings {
  [trackName: string]: number;
}

const CollectionContent: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [albumCollection, setAlbumCollection] = useState<Album[]>([]);
  const [trackRatings, setTrackRatings] = useState<TrackRatings>({});

  const getAlbumCollection = () => {
    if (localStorage != undefined) {
      const storedCollection = localStorage.getItem("albumCollection");
      const collection: Album[] = storedCollection
        ? JSON.parse(storedCollection)
        : [];

      setAlbumCollection(collection);
    }
  };

  useEffect(() => {
    getAlbumCollection();
  }, []);

  const handleGetTracklist = async (collectionId: number) => {
    try {
      const apiUrl = `https://itunes.apple.com/lookup?id=${collectionId}&entity=song`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      let fetchedTracks: Track[] = [];
      const uniqueTrackNames = new Set();

      if (data.results) {
        fetchedTracks = data.results
          .filter((result: any) => result.wrapperType === "track")
          .reduce((uniqueTracks: Track[], result: any) => {
            if (!uniqueTrackNames.has(result.trackName)) {
              uniqueTrackNames.add(result.trackName);
              uniqueTracks.push({
                trackName: result.trackName,
                rating: 0,
              });
            }
            return uniqueTracks;
          }, []);
      }

      setTracks(fetchedTracks);

      const storedRatings = JSON.parse(
        localStorage.getItem("trackRatings") || "{}"
      );
      setTrackRatings(storedRatings);
    } catch (error) {
      console.error("Error fetching tracklist:", error);
      alert("This tracklist couldn't be fetched for some reason.");
      setTracks([]);
    }
  };

  const handleDeleteAlbum = (collectionId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this album from your collection? You cannot revert this action."
      )
    ) {
      const updatedCollection = albumCollection.filter(
        (album) => album.collectionId !== collectionId
      );

      localStorage.setItem(
        "albumCollection",
        JSON.stringify(updatedCollection)
      );

      getAlbumCollection();
    }
  };

  const handleRateTrack = (trackName: string, rating: number) => {
    setTrackRatings((prevRatings) => ({
      ...prevRatings,
      [trackName]: rating,
    }));

    localStorage.setItem("trackRatings", JSON.stringify(trackRatings));
  };

  const calculateAverageScore = () => {
    if (tracks.length === 0) {
      return 0;
    }

    const totalScore = tracks.reduce(
      (sum, track) => sum + (trackRatings[track.trackName] || 0),
      0
    );
    const averageScore = totalScore / tracks.length;

    return Math.round(averageScore * 10) / 10;
  };

  const averageScore = calculateAverageScore();

  const handleClearLocalStorage = () => {
    if (
      confirm(
        "Are you sure you want to delete your collection? You cannot revert this action."
      )
    ) {
      localStorage.clear();
    }

    const storedCollection = localStorage.getItem("albumCollection");
    const collection: Album[] = storedCollection
      ? JSON.parse(storedCollection)
      : [];

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
            Here are all the albums you've saved to your collection.
          </p>

          <div className="flex flex-row justify-center items-center border-solid rounded-md sm:p-2">
            <button
              className="m-2 p-2 rounded-md border-white bg-[#1f2f6b]"
              onClick={() => handleClearLocalStorage()}
            >
              Clear collection
            </button>
          </div>

          <div className="bg-[#0f172a] rounded-md mt-4 border-white sm:p-8 sm:mx-8 py-8">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:grid-cols-3">
              {albumCollection.length > 0 ? (
                albumCollection.map((album) => (
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
                            <p className="text-sm font-semibold leading-6 text-white-600">
                              Your rating: {album.userRating}
                            </p>

                            <button
                              onClick={() =>
                                handleGetTracklist(album.collectionId)
                              }
                              className="my-1 px-2 rounded-md border-white bg-[#1f2f6b]"
                            >
                              Fetch tracklist
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteAlbum(album.collectionId)
                              }
                              className="my-1 px-2 rounded-md border-white bg-[#de1818]"
                            >
                              Delete album
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
                  {tracks.map((track) => (
                    <li key={track.trackName} className="text-white">
                      {track.trackName}
                      <input
                        className="text-black rounded-md mx-2 sm:px-1"
                        type="number"
                        min={1}
                        max={10}
                        value={trackRatings[track.trackName] || 0}
                        onChange={(e) =>
                          handleRateTrack(
                            track.trackName,
                            parseInt(e.target.value)
                          )
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollectionContent;
