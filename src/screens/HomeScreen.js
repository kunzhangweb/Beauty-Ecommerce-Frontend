import React from "react";
import { Row } from "react-bootstrap";

import data from "../data";
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <Row>
      {data.products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </Row>
  );
}
