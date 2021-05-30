import React from "react";
import { Card, Col } from "react-bootstrap";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;

  return (
    <Col lg={4} key={product._id}>
      {/* display a single product item */}
      <Card className="m-2">
        <a href={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} alt={product.name} />
        </a>
        <Card.Body>
          <a href={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </a>
          <Card.Text>
            <Rating
              rating={product.rating}
              numReviews={product.numReviews}
            />
          </Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
