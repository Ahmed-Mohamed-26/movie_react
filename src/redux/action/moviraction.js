

import axios from "axios";

export const getMovies = (data) => (dispatch) => {
  return axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=3b81a2f804f13886d671ff7875dd6f42"
    )
    .then((res) => {
      dispatch({
        type: "GET_MOVIES",
        payload: res.data.results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLangAr = (data) => (dispatch) => {
  return axios
    .get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=1c61f7854caf371b34a23ef611f0efed&&language=ar"
    )
    .then((res) => {
      dispatch({
        type: "GET_MOVIES_AR",
        payload: res.data.results,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};