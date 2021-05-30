import React, { useState, useEffect } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/products");
        setLoading(false);

        setProducts(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    // call the function fetchData
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Row>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
}
