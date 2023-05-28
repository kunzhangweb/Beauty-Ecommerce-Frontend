import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";

import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { createReviews, detailsProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductReview = useSelector((state) => state.createProductReview);
  const {
    loading: createReviewLoading,
    error: createReviewError,
    success: createReviewSuccess,
  } = createProductReview;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (createReviewSuccess) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, createReviewSuccess]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  }; // add items to the shopping cart

  // submit a review
  const submitHandler = (event) => {
    event.preventDefault();
    if (rating && comment) {
      dispatch(
        createReviews(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please leave comment and rating first.");
    }
  };

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
          {/* Review section */}
          <Row className="mx-auto">
            <h4 className="mr-2">Reviews</h4>
            {product.reviews.length === 0 && (
              <MessageBox>No review available.</MessageBox>
            )}
          </Row>
          <Row className="mx-auto">
            <ListGroup>
              {product.reviews.map((review) => (
                <ListGroup.Item as="li" key={review._id}>
                  {review.name}
                  <Rating rating={review.rating} caption=""></Rating>
                  {review.createdAt.substring(0, 10)}
                  {review.comment}
                </ListGroup.Item>
              ))}

              <ListGroup.Item as="li">
                {userInfo ? (
                  <Form onSubmit={submitHandler}>
                    {/* rate the product */}
                    <div>
                      <h5>Please rate the quality level?</h5>
                      <label className="mr-2">Rating</label>
                      <select
                        className="form-control"
                        value={rating}
                        onChange={(event) => setRating(event.target.value)}
                      >
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very good</option>
                        <option value="5">5 - Excelent</option>
                      </select>
                    </div>
                    {/* comments */}
                    <div className="mt-2">
                      <h5>What do you think of this product?</h5>
                      <textarea
                        className="form-control"
                        rows="6"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      ></textarea>
                    </div>
                    <div className="my-2">
                      <Button className="w-100" variant="primary" type="submit">
                        Submit
                      </Button>
                    </div>
                    <div className="my-1">
                      {createReviewLoading && <LoadingBox></LoadingBox>}
                      {createReviewError && (
                        <MessageBox variant="danger">
                          {createReviewError}
                        </MessageBox>
                      )}
                    </div>
                  </Form>
                ) : (
                  <MessageBox>
                    Please <Link to="/login">Log In</Link> to leave a comment.
                  </MessageBox>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Row>
        </>
      )}
    </>
  );
}
