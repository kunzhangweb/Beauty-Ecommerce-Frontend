import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";

import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

export default function PaymentMethodScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.street) {
        props.history.push("/shipping");
    } 

  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="container min-vh-100 ">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Form
        onSubmit={submitHandler}
        className="d-flex justify-content-center mt-5"
      >
        <div className="payment-card p-3">
          {/* credit card option */}
          <div className="py-2 px-3">
            <div className="first pl-2 d-flex py-3">
              <div className="form-check">
                <input
                  type="radio"
                  id="credit-card"
                  name="paymentMethod"
                  value="Credit Card"
                  className="form-check-input dot"
                  onChange={(event) => setPaymentMethod(event.target.value)}
                  
                />
              </div>
              <div className="border-left pl-2">
                <span>Credit Card</span>
                <span className="ml-2">
                  <i className="fa fa-credit-card" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="py-2 px-3">
            <div className="second pl-2 d-flex py-3">
              <div className="form-check">
                
                <input
                  type="radio"
                  id="paypal"
                  name="paymentMethod"
                  value="Paypal"
                  className="form-check-input dot"
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
              </div>
              <div className="border-left pl-2">
                <span>Paypal</span>
                <span className="ml-2">
                  <i className="fa fa-paypal" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between px-3 pt-4 pb-3">
            <div>
              <span className="mx-2">
                <Button variant="outline-primary" href="/shipping">Go Back</Button>
              </span>
            </div>
            <Button variant="primary" type="submit">
              Next
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
