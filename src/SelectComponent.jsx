// "use client";

import React, { useEffect, useState } from "react";
import "./App.css";
import api from "./services/client";
import GenreList from "./GenreList";

function SelectComponent({
  selectedGenres,
  setSelectedGenres,
  selectedGenresId,
  setSelectedGenresId,
}) {
  const [genreList, setGenreList] = useState([]);

  //This is the payload for fetching data from the TMDB api
  const genrePayload = {
    url: "genre/movie/list?language=en",
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGVmMmRjYWJmYjBiMDc4NDRjYTdkZDE1YWE3N2RkYyIsInN1YiI6IjY2NTYxZjFkMDFmY2EyMTcyMDUwODBmNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m1H6slkzAllzkucrKh244nqBhcbCnQ389E4ZFkfS2rI",
  };

  useEffect(() => {
    const storedGenres = localStorage.getItem("selectedGenres");
    const storedGenresId = localStorage.getItem("selectedGenresId");
    if (storedGenres) {
      setSelectedGenres(JSON.parse(storedGenres));
      setSelectedGenresId(JSON.parse(storedGenresId));
    }
  }, []);

  // This function of tis to to update the values of the selected genres and selected Id's in the local storage.
  // The hook is called whenever users changes their preferences, which is why it is the dependency variables for the hook to be called

  useEffect(() => {
    localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
    localStorage.setItem("selectedGenresId", JSON.stringify(selectedGenresId));
  }, [selectedGenres, selectedGenresId]);

  //This is the function that adds preference to the list of genres preference and their respective id's...
  const handleSelect = (genre, id) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genre)
        ? prevSelected.filter((g) => g !== genre)
        : [...prevSelected, genre]
    );
    setSelectedGenresId((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((g) => g !== id)
        : [...prevSelected, id]
    );
  };

  const handleRemove = (genre, id) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.filter((g) => g !== genre)
    );
    setSelectedGenresId((prevSelected) => prevSelected.filter((g) => g !== id));
  };

  // The function of this is to fetch the list of genres we have for TMDB movies. The dependency for this is empty
  // and thats's because we want the fetch to happen only on the first render of the page...

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const fetchGenresResponse = await api.get(genrePayload);
        setGenreList(fetchGenresResponse?.genres);
      } catch (error) {}
    };
    fetchGenres();
  }, []);
  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="relative">
        <button
          className="w-full bg-[#ffffff00] text-[#ffffffaa] border border-[#ffffff2d] rounded-lg shadow-sm px-2 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm backdrop-blur-lg"
          type="button"
        >
          <h2 className="text-center text-3xl font-bold">
            Filter Movie By Genres
          </h2>
        </button>
        <div className="mt-1 w-full rounded-md bg-[#ffffff0a] shadow-lg z-10 backdrop-blur-lg">
          <ul
            tabIndex="-1"
            role="listbox"
            className="max-h-[100px] rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {genreList?.map((genre) => (
              <li
                key={genre.id}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9"
                onClick={() => handleSelect(genre.name, genre.id)}
              >
                <div className="flex items-center">
                  <span
                    className={`font-normal ml-3 block text-[#ffffffdd] truncate ${
                      selectedGenres.includes(genre.name) ? "font-semibold" : ""
                    }`}
                  >
                    {genre.name}
                  </span>
                </div>
                {selectedGenres.includes(genre.name) && (
                  <span className="text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414L9.414 14l-3.707-3.707a1 1 0 111.414-1.414l2.293 2.293 6.293-6.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <GenreList selectedGenres={selectedGenres} handleRemove={handleRemove} />
    </div>
  );
}

export default SelectComponent;
