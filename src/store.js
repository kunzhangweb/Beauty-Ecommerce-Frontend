import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderDeleteReducer,
  orderDeliveryReducer,
  orderDetailsReducer,
  orderListReducer,
  orderMyListReducer,
  orderPayReducer,
  placeOrderReducer,
} from "./reducers/orderReducers";

import {
  createProductReducer,
  deleteProductReducer,
  productCategoryListReducer,
  productListReducer,
  productReviewCreateReducer,
  updateProductReducer,
} from "./reducers/productReducers";
import { productDetailsReducer } from "./reducers/productReducers";
import {
  userDeleteReducer,
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userSignupReducer,
  userTopSellerListReducer,
  userUpdatePrivilegeReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {},
    paymentMethod: "PayPal",
  },
  userLogin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  placeOrder: placeOrderReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  // orderHistoryList: orderHistoryReducer,
  userDetail: userDetailReducer,
  userUpdateProfile: userUpdateReducer,
  productCreate: createProductReducer,
  updateProduct: updateProductReducer,
  productDelete: deleteProductReducer,
  orderList: orderListReducer,
  orderMyList: orderMyListReducer,
  orderDelete: orderDeleteReducer,
  orderDelivery: orderDeliveryReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  updatePrivilege: userUpdatePrivilegeReducer,
  productCategoryList: productCategoryListReducer,
  createProductReview: productReviewCreateReducer,
  userTopSellersList: userTopSellerListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
