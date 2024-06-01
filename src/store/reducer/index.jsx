// reducers/index.js
import { combineReducers } from "redux";
import movieReducer from "../movieReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  loading: movieReducer,
  // Add other reducers here if needed
});

export default rootReducer;
