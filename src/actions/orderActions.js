import axios from "axios";

import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
} from "../constants/orderConstants";
import { CART_EMPTY } from "../constants/cartConstants";

export const placeOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: PLACE_ORDER_REQUEST, payload: order });

  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/orders", order, {
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
    localStorage.removeItem('cartItems');
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
