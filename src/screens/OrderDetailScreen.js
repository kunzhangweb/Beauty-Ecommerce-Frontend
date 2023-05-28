import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

import { deliverOrder, detailOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_DELIVERY_RESET, PAY_ORDER_RESET } from "../constants/orderConstants";

export default function OrderDetailScreen(props) {
  const orderId = props.match.params.id;
  const [sdkPaypalReady, setSdkPaypalReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const orderDelivery = useSelector(state => state.orderDelivery);
  const {
    loading: loadingDelivery,
    error: errorDelivery,
    success: successDelivery,
  } = orderDelivery;

  const dispatch = useDispatch();

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkPaypalReady(true);
      };
      document.body.appendChild(script);
    }; // end addPaypalScript
    if (!order || successPay || successDelivery || (order && order._id !== orderId)) {
      dispatch({ type: PAY_ORDER_RESET });
      dispatch({ type: ORDER_DELIVERY_RESET });
      dispatch(detailOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkPaypalReady(true);
        }
      }
    } // outer if
  }, [dispatch, orderId, order, sdkPaypalReady, successPay, successDelivery]);
  // useEffect(() => {
  //   dispatch(detailOrder(orderId));
  // }, [dispatch, orderId]);

  // successfully dispatch the payed order via Paypal
  const paymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  // deliver the placed order
  const deliveryHandler = () => {
    dispatch(deliverOrder(order._id));
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    // return (
    <div className="container min-vh-100 min-vw-100">
      <h2>Order {order._id} Information</h2>
      <Row>
        <Col>
          <ul className="list-group">
            {/* shipping info */}
            <li>
              <Card className="my-1" style={{ background: "#eaf4ff" }}>
                <Card.Body>
                  <Card.Title>Shipping Information</Card.Title>
                  <Card.Text>
                    <strong className="text-muted">Customer Name: </strong>{" "}
                    {order.shippingAddress.firstName},{" "}
                    {order.shippingAddress.lastName} <br />
                    <strong className="text-muted">Address: </strong>{" "}
                    {order.shippingAddress.street}, {order.shippingAddress.city}
                    , {order.shippingAddress.state},{" "}
                    {order.shippingAddress.zipcode}
                    <br />
                    {/* show delivery message */}
                    {order.isDelivered ? (
                      <MessageBox variant="success">
                        Delivered at {order.deliveredAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">
                        Not Delivered Yet
                      </MessageBox>
                    )}
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
                    {order.paymentMethod} <br />
                    {/* show payment message */}
                    {order.isPaid ? (
                      <MessageBox variant="success">
                        Paid at {order.paidAt}
                      </MessageBox>
                    ) : (
                      <MessageBox variant="danger">Not Paid Yet</MessageBox>
                    )}
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
                    <ul className="list-group">
                      {order.orderItems.map((item) => (
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
                <div className="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Items Subtotal: </strong>
                  </div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* shipping fee */}
              <Card.Text>
                <div className="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Shipping Fee: </strong>
                  </div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* tax charged */}
              <Card.Text>
                <div className="d-flex">
                  <div className="mr-auto">
                    <strong className="text-muted">Tax: </strong>
                  </div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </Card.Text>
              {/* Order Total */}
              <Card.Text>
                <div className="d-flex">
                  <div className="mr-auto">
                    <strong>Order Total </strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </Card.Text>
              {/* display paypal button */}

              {!order.isPaid && (
                <Card.Text>
                  {!setSdkPaypalReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={paymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </Card.Text>
              )}

              {/* Delivery Button */}
              { userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <Card.Text>
                  { loadingDelivery && <LoadingBox></LoadingBox> }
                  { errorDelivery && (
                        <MessageBox variant="danger"> { errorDelivery }</MessageBox>
                      )}
                  <Button
                        variant="success"
                        className="w-100"
                        onSuccess={ deliveryHandler }
                      >Deliver Order</Button>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
