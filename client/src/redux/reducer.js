import { ActionTypes } from "./ActionTypes";

function reducer(
  state = {
    user: {},
  },
  action
) {
  console.log(action.payload);

  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
}
export default reducer;
