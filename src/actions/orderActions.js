import axios from "axios";

import {
  MY_ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERY_FAIL,
  ORDER_DELIVERY_REQUEST,
  ORDER_DELIVERY_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";
import { BACKEND_URL } from "../constants/backendUrl";

export const placeOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST, payload: order });

  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post(BACKEND_URL + "/api/orders", order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: data.order,
    });
    // empty the shopping cart after placing an order
    dispatch({
      type: CART_EMPTY,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(BACKEND_URL + `/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: PAY_ORDER_REQUEST, payload: { order, paymentResult } });
    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const { data } = await axios.put(
        BACKEND_URL + `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: PAY_ORDER_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PAY_ORDER_FAIL, payload: message });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const { data } = await axios.get(BACKEND_URL + "/api/orders/mine", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: message });
  }
};

export const listOrders =
  ({ seller = "" }) =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const { data } = await axios.get(
        BACKEND_URL + `/api/orders?seller=${seller}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_LIST_FAIL, payload: message });
    }
  };

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const data = await axios.delete(BACKEND_URL + `/api/order/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELETE_FAIL, payload: message });
  }
};

export const deliverOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELIVERY_REQUEST, payload: orderId });
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    const data = await axios.put(
      BACKEND_URL + `/api/order/${orderId}/deliver`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: ORDER_DELIVERY_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: ORDER_DELIVERY_FAIL, payload: message });
  }
};
