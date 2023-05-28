import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Pagination, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  listProducts,
  createProduct,
  deleteProduct,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_GENERATION_RESET,
} from "../constants/productConstants";
import { useParams } from "react-router-dom";

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, products, error, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: generateLoading,
    product: generateProduct,
    error: generateError,
    success: generateSuccess,
  } = productCreate;

  // delete product
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const sellerMode = props.match.path.indexOf("seller") >= 0;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (generateSuccess) {
      dispatch({ type: PRODUCT_GENERATION_RESET });
      props.history.push(`/product/${generateProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber })
    );
  }, [
    dispatch,
    generateProduct,
    props.history,
    generateSuccess,
    successDelete,
    sellerMode,
    userInfo._id,
    pageNumber,
  ]);

  // create a new product
  const generateHandler = () => {
    dispatch(createProduct());
  };

  // delete the seleted product
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="container min-vh-100 min-vw-100">
      <h4>PRODUCT LIST</h4>
      <Button
        className="my-2"
        variant="outline-primary"
        onClick={generateHandler}
      >
        Create New Product
      </Button>
      {generateLoading && <LoadingBox></LoadingBox>}
      {generateError && (
        <MessageBox variant="danger">{generateError}</MessageBox>
      )}
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    className="mx-1"
                    variant="outline-warning"
                    onClick={() => {
                      props.history.push(`/product/${product._id}/edit`);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
       {/* page selection */}
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Pagination>
            <Pagination.Item>
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/productlist/pageNumber/${x + 1}`}
              >{ x + 1 }</Link>
            </Pagination.Item>
          </Pagination>
        ))}
      </div>
    </div>
  );
}
