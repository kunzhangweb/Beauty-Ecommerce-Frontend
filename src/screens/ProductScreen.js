import React from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";

import data from "../data";

export default function ProductScreen(props) {
  const product = data.products.find(
    (item) => item._id === props.match.params.id
  );

  if (!product) {
    return <div>Product Not Found!</div>;
  }
  return (
    <Row>
      {/* product picture */}
      <Col lg={6}>
        <Image src={product.image} alt={product.name}></Image>
      </Col>
      {/* product detail info */}
      <Col md={4}>
        <ListGroup as="ul">
          <ListGroup.Item as="li" active>
            {product.sku}
          </ListGroup.Item>
          <ListGroup.Item as="li">{product.name}</ListGroup.Item>
          <ListGroup.Item as="li">
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </ListGroup.Item>
          <ListGroup.Item as="li">{product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      {/* in stock? */}
      <Col sm={2}>
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
          <ListGroup.Item as="li">
            <Button variant="warning">Add To Cart</Button>{" "}
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
}
