import { ActionTypes } from "./ActionTypes";

export const SetUser = (user) => {
  return {
    type: ActionTypes.LOGIN_USER,
    payload: user,
  };
};

export const logOutUser = () => {
  return {
    type: ActionTypes.LOGOUT_USER,
  };
};
