import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ title, release_date, id, popularity, poster_path }) => {
  return (
    <Link to={`/movie/${id}`} className="text-black">
      <div className="max-w-xs rounded  bg-[#ffffffdd] shadow-lg hover:shadow-xl transition duration-300 cursor-pointer h-full">
        <div className="overflow-hidden">
          <img
            className="w-full trans-img overflow-hidden h-[400px] object-cover"
            src={`https://image.tmdb.org/t/p/w300${poster_path}`}
            alt={title}
          />
        </div>
        <div className="px-6 py-4 flex flex-col">
          <div className="font-bold text-xl mb-2">{title}</div>
          <div className="mt-auto">
            <p className=" text-black text-base">
              <span className="font-semibold">Year:</span> {release_date}
            </p>
            <p className="text-black text-base">
              <span className="font-semibold">Popularity:</span> {popularity}
            </p>
            <p className="text-black text-base">
              <span className="font-semibold">TMDb ID:</span> {id}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
