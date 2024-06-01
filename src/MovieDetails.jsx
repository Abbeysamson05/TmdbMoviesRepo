import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "./services/client";
import { Link } from "react-router-dom";
import { formatRuntime } from "./utils/FormatTime";
import RatingComponent from "./utils/Rating";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const payload = {
        url: `movie/${id}?language=en-US`,
        token: import.meta.env.VITE_TOKEN,
      };
      try {
        const response = await api.get(payload);
        console.log(response);
        setMovieDetails(response);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-white text-center mt-8 animate-fade-in">
        <p>Loading movie details...</p>
      </div>
    );
  }

  return (
    <section className=" mx-auto">
      <div className="text-white p-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-8">{movieDetails?.title}</h1>
        <div className="grid-template gap-5 items-center">
          <div className="flex justfy-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
              alt={movieDetails?.title}
              className="rounded-lg shadow-lg object-cover w-[650px] h-[500px]"
            />
          </div>
          <div className="">
            <p className="text-xl mb-2">
              <span className="font-semibold">Released:</span>{" "}
              {movieDetails?.release_date}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Runtime:</span>{" "}
              {formatRuntime(movieDetails?.runtime)}
            </p>

            <p className="text-xl mb-2 inline-flex">
              <span className="font-semibold">Genre:</span>
              {movieDetails.genres.map((genre, index) => (
                <span key={index} className="ms-1">
                  {genre.name}
                  {index < movieDetails.genres.length - 1 && ",  "}
                </span>
              ))}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Director:</span>{" "}
              {movieDetails?.production_companies[0]?.name}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Tagline:</span>{" "}
              {movieDetails?.tagline}
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Language:</span>{" "}
              {(movieDetails?.original_language).toUpperCase()}
            </p>
            <div className="flex flex-col">
              <p className="text-xl mb-2">
                <span className="font-semibold">Country:</span>{" "}
                {movieDetails?.origin_country}
              </p>
              <Link
                to={movieDetails?.homepage}
                target="_blank"
                className="text-white text-xl mb-2 underline"
              >
                <span className="font-semibold">Homepage:</span>{" "}
                {movieDetails?.homepage}
              </Link>
            </div>
            <p className="text-xl mb-2 inline-flex">
              <span className="font-semibold me-1">IMDb Rating: </span>{" "}
              <RatingComponent num={7.5} />
            </p>
            <p className="text-xl mb-2">
              <span className="font-semibold">Overview:</span>{" "}
              {movieDetails?.overview}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
