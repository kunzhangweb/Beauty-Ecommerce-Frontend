import React, { useEffect } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  // delete one item from the cart
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // proceed to the checkout page
  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <Row>
      {/* List of cart items */}
      <Col lg={9}>
        <h2>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <MessageBox>
            The shopping cart is empty. <Link to="/">Continue Shopping</Link>
          </MessageBox>
        ) : (
          <ul class="list-unstyled">
            {cartItems.map((item) => (
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
                  <Col lg={4}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  {/* Change quantities */}
                  <Col lg={2}>
                    <select
                      className="form-select"
                      value={item.qty}
                      onChange={(event) =>
                        dispatch(
                          addToCart(item.product, Number(event.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col lg={1}>${item.price}</Col>

                  {/* delete the item */}
                  <Col lg={2}>
                    <Button
                      variant="outline-danger"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i class="fa fa-trash">
                        <span className="mx-1"></span>
                      </i>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        )}
      </Col>

      {/* Actions for the cart */}
      <Col lg={3}>
        <ListGroup as="ul" className="my-4">
          <ListGroup.Item as="li" active>
            Subtotal: ({cartItems.reduce((a, b) => a + b.qty, 0)} items ) : $
            {cartItems.reduce((a, b) => a + b.price * b.qty, 0)}
          </ListGroup.Item>
          {/* checkout button */}
          <ListGroup.Item as="li">
            <Button
              variant="warning"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
            >
              <i class="fa fa-credit-card" aria-hidden="true"></i>
              <span className="mx-1"></span>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}
