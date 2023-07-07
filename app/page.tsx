import React, { useEffect } from "react";

export default function Page() {
  /* useEffect(() => {
    const handleAuthentication = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        try {
          const response = await fetch("/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code,
            }),
          });

          if (response.ok) {
            const { access_token, refresh_token } = await response.json();

            // Store the access token and refresh token securely (e.g., in local storage or state management library)

            // Redirect the user to the desired page after successful authentication
            window.location.href = "/dashboard";
          } else {
            // Handle error response
            console.error(
              "Failed to exchange authorization code for access token"
            );
          }
        } catch (error) {
          // Handle network or other errors
          console.error("An error occurred during authentication", error);
        }
      } else {
        // Handle missing authorization code
        console.error("Authorization code not found in callback URL");
      }
    };

    handleAuthentication();
  }, []); */

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
