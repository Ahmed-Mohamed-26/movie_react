const INITIAL_VALUE = {
  list: [],
};
export default function moviesReducer(state = INITIAL_VALUE, action) {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        list: action.payload,
      };
    case "GET_MOVIES_AR":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
}
