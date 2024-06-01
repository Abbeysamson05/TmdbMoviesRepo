export const FETCH_MOVIES = "FETCH_MOVIES";
export const SET_LOADING = "SET_LOADING";

export const fetchMovies = (movies) => ({
  type: FETCH_MOVIES,
  payload: movies,
});
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});


