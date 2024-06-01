import { combineReducers } from "redux";
import movieReducer from "../movieReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  loading: movieReducer,
});

export default rootReducer;
