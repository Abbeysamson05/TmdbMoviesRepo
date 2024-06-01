import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard ";
import SelectComponent from "./SelectComponent";

const SearchSection = ({ searchResults, loading }) => {
  //This is the variable holding datas to display to the users based on their selected preferences...
  const [
    filteredFilmsBasedOnUsersPreference,
    setFilteredFilmsBasedOnUsersPreference,
  ] = useState([]);
  //This is the variable holding all the genres in the local storage...
  const [selectedGenres, setSelectedGenres] = useState(
    JSON.parse(localStorage.getItem("selectedGenres")) || []
  );
  //This is the variable holding all the genres id in the local storage...
  const [selectedGenresId, setSelectedGenresId] = useState(
    JSON.parse(localStorage.getItem("selectedGenresId")) || []
  );

  // The purpose of this is to filter the stored film list in redux store based on users selected preference...
  // This function is handled inside useEffect so whenever users select or unselect their preferences, it automatically
  // filters the films in the store and returns the new film array based on users new preference...

  useEffect(() => {
    function filterFilmsByGenre(films, ids) {
      if (selectedGenresId.length < 1) return searchResults;
      return films.filter(
        (film) =>
          Array.isArray(film.genre_ids) &&
          film.genre_ids.some((id) => ids.includes(id))
      );
    }
    //THe filteredFilms variable is used to store the movies to be displayed to users after the films has been filtered by the user preferences stored in the local storage
    const filteredFilms = filterFilmsByGenre(searchResults, selectedGenresId);
    console.log(filteredFilms);

    setFilteredFilmsBasedOnUsersPreference(filteredFilms);
  }, [selectedGenresId, searchResults]);

  return (
    <section className="w-11/12 md:w-10/12 mx-auto pb-12">
      <SelectComponent
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        selectedGenresId={selectedGenresId}
        setSelectedGenresId={setSelectedGenresId}
      />
      {loading && <p className="text-white text-center mt-4">Loading...</p>}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
          {filteredFilmsBasedOnUsersPreference.map((result, index) => (
            <MovieCard key={index} {...result} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchSection;
