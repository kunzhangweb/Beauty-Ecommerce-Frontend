import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;

  return (
    <Col lg={4} key={product._id}>
      {/* display a single product item */}
      <Card className="m-2">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </Card.Text>

          <Row>
            <Card.Text>${product.price}</Card.Text>
            {/* <Link to={`/seller/${product.seller._id}`}>
              <Card.Title>{product.seller.seller.name}</Card.Title>
            </Link> */}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
}
