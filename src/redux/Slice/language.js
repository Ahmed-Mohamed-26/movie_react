import EN from "../../lang/EN.js";
import AR from "../../lang/ar.js";
import { createSlice } from "@reduxjs/toolkit";

const translate = {
  en: EN,
  ar: AR,
};
const INITIAL_STATE = {
  basicLanguage: "en",
  translate: translate["en"],
};

const language = createSlice({
  name: "language",
  initialState: INITIAL_STATE,
  reducers: {
    changeLanguage(state, action) {
      state.basicLanguage = action.payload;
      state.translate = translate[action.payload];
    },
  },
});
export const { changeLanguage } = language.actions;
export default language.reducer;
