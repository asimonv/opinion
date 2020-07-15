import { authConstants } from "../constants";
import authService from "../services/auth";

const requestAuth = data => ({
  type: authConstants.AUTH_REQUEST,
  data,
});

const receiveResponse = (data, res) => ({
  type: authConstants.AUTH_REQUEST_FULLFILED,
  payload: res,
  data,
});

const signOutFullfiled = res => ({
  type: authConstants.SIGNOUT_REQUEST_FULLFILED,
  payload: res,
  res,
});

const requestSignOut = () => ({
  type: authConstants.SIGNOUT_REQUEST,
});

const rejectResponse = data => ({
  type: authConstants.AUTH_REQUEST_REJECTED,
  payload: data.error,
  data,
});

const rejectSignOut = data => ({
  type: authConstants.SIGNOUT_REQUEST_REJECTED,
  payload: data.erorr,
  data,
});

export const signOut = () => async dispatch => {
  dispatch(requestSignOut());
  const res = await authService.signOut();

  if (res.error) {
    dispatch(rejectSignOut(res));
  } else {
    dispatch(signOutFullfiled(res));
    localStorage.removeItem("currentUser");
  }
};

export const signIn = (data, history) => async dispatch => {
  dispatch(requestAuth(data));
  const res = await authService.signIn(data);

  if (res.error) {
    dispatch(rejectResponse(res));
  } else {
    dispatch(receiveResponse(data, res));
    localStorage.setItem("currentUser", res.currentUser);
    history.push("/");
  }
};

export default { signIn, signOut };
