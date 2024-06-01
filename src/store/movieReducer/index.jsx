import { FETCH_MOVIES, SET_LOADING } from "../actions";

const initialState = {
  movies: [],
  loading: false,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return { ...state, movies: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default movieReducer;
