import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_DETAIL_REQUEST,
  USER_DETAIL_FAIL,
  USER_DETAIL_SUCCESS,
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_PRIVILEGE_REQUEST,
  UPDATE_USER_PRIVILEGE_SUCCESS,
  UPDATE_USER_PRIVILEGE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_TOPSELLERS_LIST_REQUEST,
  USER_TOPSELLERS_LIST_SUCCESS,
  USER_TOPSELLERS_LIST_FAIL,
} from "../constants/userConstants";
import { BACKEND_URL } from "../constants/backendUrl";

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await axios.post(BACKEND_URL + "/api/users/login", {
      email,
      password,
    });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

// register action
export const signup = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNUP_REQUEST,
    payload: { email, password },
  });

  try {
    const { data } = await axios.post(BACKEND_URL + "/api/users/signup", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: USER_DETAIL_REQUEST, payload: userId });

  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(BACKEND_URL + `/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });

  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.put(BACKEND_URL + "/api/users/profile", user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: data });
    // login again
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// all registered users
export const listUsers = () => async (dispatch, getState) => {
  dispatch({ type: LIST_USER_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(BACKEND_URL + "/api/users", {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: LIST_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: LIST_USER_FAIL, payload: message });
  }
};

export const deleteUser = (userId) => (dispatch, getState) => {
  dispatch({ type: DELETE_USER_REQUEST, payload: userId });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = axios.delete(BACKEND_URL + `/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: DELETE_USER_FAIL, payload: message });
  }
};

export const updateUserPrivilege = (user) => (dispatch, getState) => {
  dispatch({ type: UPDATE_USER_PRIVILEGE_REQUEST, payload: user });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = axios.put(BACKEND_URL + `/api/users/${user._id}`, user, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: UPDATE_USER_PRIVILEGE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: UPDATE_USER_PRIVILEGE_FAIL, payload: message });
  }
};

export const listTopSellers = () => (dispatch) => {
  dispatch({ type: USER_TOPSELLERS_LIST_REQUEST });

  try {
    const { data } = axios.get(BACKEND_URL + "/api/users/top-sellers");
    dispatch({ type: USER_TOPSELLERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: USER_TOPSELLERS_LIST_FAIL, payload: message });
  }
};
