import { useState, useEffect } from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MovieDetails from "./MovieDetails";
import MainSection from "./MainSection";
import api from "./services/client";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, setLoading } from "./store/actions";

function App() {
  const dispatch = useDispatch();

  const { movies, loading } = useSelector((state) => state.movies);
  //
  const fetchMovieDatas = async () => {
    dispatch(setLoading(true));
    const payload = {
      url: "discover/movie",
      token: import.meta.env.VITE_TOKEN,
    };
    try {
      dispatch(setLoading(false));
      const response = await api.get(payload);
      console.log(response);
      dispatch(fetchMovies(response?.results));
    } catch (error) {
      dispatch(setLoading(true));
      console.error("Error fetching last search result:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchMovieDatas();
  }, []);

  return (
    <>
      <Router>
        <div
          className="text-white"
          style={{
            minHeight: "100vh",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/443881de-6e3c-4cbc-ac83-9e2a5affa6aa/NG-en-20240115-trifectadaily-perspective_alpha_website_large.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <header>
            <nav className="w-11/12 md:w-10/12 mx-auto py-8">
              <div className="flex text-white justify-between gap-4 items-center">
                <Link to={"/"} className="cursor-pointer">
                  <h1 className="text-3xl font-bold">TMDB Movies</h1>
                </Link>
                <h4 className="text-sm">Home of amazing movies</h4>
              </div>
            </nav>
          </header>
          <Routes>
            <Route
              path="/"
              element={<MainSection searchResults={movies} loading={loading} />}
            />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
