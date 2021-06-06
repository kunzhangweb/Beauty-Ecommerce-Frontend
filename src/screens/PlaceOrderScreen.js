import React, { useEffect } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { placeOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { PLACE_ORDER_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }

  // sum the total price
  const calPrice = (num) => Number(num.toFixed(2));
  cart.itemsPrice = calPrice(
    cart.cartItems.reduce((a, b) => a + b.qty * b.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 50 ? calPrice(0) : calPrice(10);
  cart.taxPrice = calPrice(cart.itemsPrice * 0.09);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const orderCreated = useSelector((state) => state.placeOrder);
  const { loading, success, error, order } = orderCreated;
  const dispatch = useDispatch();
  // place the order
  const placeOrderHandler = () => {
    dispatch(placeOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: PLACE_ORDER_RESET });
    }
  }, [success, order, props.history, dispatch]);

  return (
    <div className="container min-vh-100 min-vw-100">
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <Row>
        <Col>
          <ul>
            {/* shipping info */}
            <li>
              <Card className="my-1" style={{ background: "#eaf4ff" }}>
                <Card.Body>
                  <Card.Title>Shipping Information</Card.Title>
                  <Card.Text>
                    <strong className="text-muted">Customer Name: </strong>{" "}
                    {cart.shippingAddress.firstName},{" "}
                    {cart.shippingAddress.lastName} <br />
                    <strong className="text-muted">Address: </strong>{" "}
                    {cart.shippingAddress.street}, {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.state}, {cart.shippingAddress.zipcode}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
            {/* payment method */}
            <li>
              <Card className="my-1" style={{ background: "#eaf4ff" }}>
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong className="text-muted">Method: </strong>{" "}
                    {cart.paymentMethod} <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
            {/* ordered items */}
            <li>
              <Card className="my-1" style={{ background: "#eaf4ff" }}>
                <Card.Body>
                  <Card.Title>Ordered Items</Card.Title>
                  <Card.Text>
                    <ul>
                      {cart.cartItems.map((item) => (
                        <li key={item.product}>
                          <Row>
                            {/* item picture */}
                            <Col lg={2}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                className="img-thumbnail  m-2"
                              />
                            </Col>

                            {/* Link to product detail page */}
                            <Col lg={5}>
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>

                            <Col lg={3}>
                              ${item.price} x {item.qty} = $
                              {item.price * item.qty}
                            </Col>
                          </Row>
                        </li>
                      ))}
                    </ul>
                    {/* end item list */}
                  </Card.Text>
                </Card.Body>
              </Card>
            </li>
          </ul>
        </Col>

        {/* Total summary */}
        <Col lg={4}>
          <Card className="my-1" style={{ background: "#eaf4ff" }}>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              {/* subtotal */}
              <Card.Text>
                <div class="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Items Subtotal: </strong>
                  </div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* shipping fee */}
              <Card.Text>
                <div class="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Shipping Fee: </strong>
                  </div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* tax charged */}
              <Card.Text>
                <div class="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Tax: </strong>
                  </div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* Order Total */}
              <Card.Text>
                <div class="d-flex">
                  <div className="mr-auto">
                    <strong>Order Total </strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </Card.Text>
              <Button
                variant="warning"
                className="w-100"
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
