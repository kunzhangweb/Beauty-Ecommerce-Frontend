import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, NavLink } from "react-router-dom";
import { Col, ListGroup, Form, Pagination, Row } from "react-bootstrap";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import data from "../data";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, name, min, max, rating, order]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;

    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };

  return (
    <div className="m-6 w-60 min-vh-100">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Form.Row>
          <Form.Group as={Col} controlId="searchedResults">
            <Form.Label>{products.length} Results</Form.Label>
          </Form.Group>
          <div className="col-auto">
            <label for="sortOptions" className="col-form-label">
              Sort By{" "}
            </label>
          </div>
          <div className="col-auto">
            <Form.Group controlId="sortOptions">
              <Form.Control
                as="select"
                defaultValue="Featured"
                value={order}
                onChange={(event) => {
                  props.history.push(
                    getFilterUrl({ order: event.target.value })
                  );
                }}
              >
                <option value="newest">Featured</option>
                <option value="lowest">Price: Low to High</option>
                <option value="highest">Price: High to Low</option>
                <option value="toprated">Avg. Customer Reviews</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Form.Row>
      )}
      <hr />
      <Row className="my-1">
        {/* sidebar */}
        <Col lg={2}>
          <div>
            <h4>Groups</h4>
            {/* display all the categories */}
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ListGroup className="my-1">
                <ListGroup.Item>
                  <Link
                    className={"all" === category ? "active" : ""}
                    to={getFilterUrl({ category: "all" })}
                  >
                    Any
                  </Link>
                </ListGroup.Item>
                {categories.map((cat) => (
                  <ListGroup.Item key={cat}>
                    <Link
                      className={cat === category ? "active" : ""}
                      to={getFilterUrl({ category: cat })}
                    >
                      {cat}
                    </Link>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          <div className="my-2">
            <h4>Price</h4>
            {/* sort by price ranges */}
            <ListGroup className="my-1">
              {data.prices.map((p) => (
                <ListGroup.Item key={p.range}>
                  <Link
                    className={
                      `${p.max} - ${p.min}` === `${max} - ${min}`
                        ? "active"
                        : ""
                    }
                    to={getFilterUrl({ min: p.min, max: p.max })}
                  >
                    {p.range}
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>

          <div className="my-2">
            <h4>Avg. Customer Review</h4>
            {/* sort by customers' reviews */}
            <ListGroup className="my-1">
              {data.ratings.map((r) => (
                <ListGroup.Item key={r.range}>
                  <Link
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                    to={getFilterUrl({ rating: r.rating })}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
        {/* display the search result */}
        <Col>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {products.length === 0 && (
                <MessageBox>No Product Found</MessageBox>
              )}
              <Row>
                {products.map((product) => (
                  <Product key={product._id} product={product}></Product>
                ))}
              </Row>
              {/* page dividing */}
              <div className="pagination">
                {[...Array(pages).keys()].map((p) => (
                  <div className={p + 1 === page ? "active" : ""} key={p + 1}>
                    <a href={getFilterUrl({ page: p + 1 })}>{p + 1}</a>
                  </div>
                ))}
              </div>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}
