import React, { useEffect } from "react";
import { Carousel, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";

import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProducts } from "../actions/productActions";
import { listTopSellers } from "../actions/userActions";

// import data from "../data";

export default function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(productList);
  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: sellerLoading,
    users: sellers,
    error: sellerError,
  } = userTopSellersList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers({}));
  }, [dispatch]);

  return (
    <div>
      <h4>Top Sellers</h4>
      {sellerLoading ? (
        <LoadingBox></LoadingBox>
      ) : sellerError ? (
        <MessageBox variant="danger">{sellerError}</MessageBox>
      ) : (
        <>
          {/* {sellers.length === 0 && (
            <MessageBox variant="danger">No Seller Found!</MessageBox>
          )} */}
          <hr />
          <Carousel>
            <Carousel.Item>
              <img src="/images/Shiseido.jpeg" alt="Shiseido" />
              <Carousel.Caption>
                <h3>Shiseido Corp</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img src="/images/Whoo.jpeg" alt="Whoo" />
              <Carousel.Caption>
                <h3>Whoo Brand</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          {/* <Carousel className="mx-auto" showArrows={true} showThumbs={false} autoPlay>
              <div>
                <img src="/images/Shiseido.jpeg" alt="Shiseido" />
                <p className="legend">Shiseido</p>
              </div>
              <div>
                <img src="/images/Whoo.jpeg" alt="Whoo" />
                <p className="legend">Whoo</p>
              </div>
            </Carousel> */}

          <hr />
        </>
      )}
      <h4>Featured Products</h4>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            {products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        </>
      )}
    </div>
  );
}
