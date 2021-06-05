import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";

import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";
import { Link } from "react-router-dom";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  }; // add items to the shopping cart

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Link to="/">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
            <span className="mx-1"></span>Back to Results
          </Link>
          <Row>
            {/* product picture */}
            <Col md={4} lg={7}>
              <Image src={product.image} alt={product.name}></Image>
            </Col>
            {/* product detail info */}
            <Col xs={4} lg={3}>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  {product.sku}
                </ListGroup.Item>
                <ListGroup.Item as="li">{product.name}</ListGroup.Item>
                <ListGroup.Item as="li">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item as="li">{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            {/* in stock? */}
            <Col xs={4} md={2}>
              <ListGroup as="ul">
                <ListGroup.Item as="li" active>
                  Price ${product.price}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Status
                  {product.countInStock > 0 ? (
                    <ListGroup.Item action variant="success">
                      In Stock
                    </ListGroup.Item>
                  ) : (
                    <ListGroup.Item action variant="danger">
                      Not Available
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
                {/* choose the amount of product to add */}
                {product.countInStock > 0 && (
                  <>
                    <ListGroup.Item as="li">
                      <span className="m-1">Quantity</span>
                      <span>
                        <select
                          className="form-select"
                          value={qty}
                          onChange={(event) => setQty(event.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </span>
                      <Button
                        className="my-1"
                        variant="warning"
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>{" "}
                    </ListGroup.Item>
                  </>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}
