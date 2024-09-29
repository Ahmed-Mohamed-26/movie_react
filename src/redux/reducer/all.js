import { combineReducers } from "redux";
import favoritesReducer from "./favR";
import moviesReducer from "./moviesreducer";
import languageReducer from "../Slice/language.js";

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  myList: moviesReducer,
  language: languageReducer,
});

export default rootReducer;
