import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

export default function ShippingAddressScreen(props) {
  // only login customer can view the shipping form
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    props.history.push("/login");
  }

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [firstName, setFirstName] = useState(shippingAddress.firstName);
  const [lastName, setLastName] = useState(shippingAddress.lastName);
  const [street, setStreet] = useState(shippingAddress.street);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zipcode, setZipcode] = useState(shippingAddress.zipcode);

  const dispatch = useDispatch();

  // submit the shipping address form
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      saveShippingAddress({
        firstName,
        lastName,
        street,
        city,
        state,
        zipcode,
      })
    );

    props.history.push("/payment");
  };

  return (
    <div className="col-8 mx-auto my-3">
      <CheckoutSteps step1 step2></CheckoutSteps>
      {/* address form */}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="firstName">
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group id="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group id="street">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            value={street}
            onChange={(event) => setStreet(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group id="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group id="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group id="zipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            required
          />
        </Form.Group>
        <Button className="w-100 mt-3" type="submit">
          Next
          <i className="fa fa-arrow-right mx-2"></i>
        </Button>
      </Form>
    </div>
  );
}
