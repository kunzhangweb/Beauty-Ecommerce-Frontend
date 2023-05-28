import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import axios from "../../node_modules/axios/index";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;
  const productUpdate = useSelector((state) => state.updateProduct);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }

    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setSku(product.sku);
      setName(product.name);
      setImage(product.image);
      setDescription(product.description);
      setCategory(product.category);
      setBrand(product.brand);
      setPrice(product.price);
      setCountInStock(product.countInStock);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  // submit the updated data
  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        sku,
        name,
        image,
        price,
        description,
        brand,
        category,
        countInStock,
      })
    );
  };

  // uploading
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const uploadHandler = async (event) => {
    const file = event.target.file[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploadLoading(true);
    try {
      const { data } = await axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setUploadLoading(false);
    } catch (error) {
      setUploadError(error.message);
      setUploadLoading(false);
    }
  };

  return (
    <div className="m-auto w-50 min-vh-100">
      <Card className="mt-5">
        <Card.Body>
          <h4 className="text-center mb-4">Edit Product {productId}</h4>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sku">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter product SKU"
                    value={sku}
                    onChange={(event) => setSku(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter product name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter image path"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="imageFile">
                  <Form.Label>Image File</Form.Label>
                  <Form.Control
                    type="file"
                    label="Choose Image"
                    onChange={uploadHandler}
                  />
                  {uploadLoading && <LoadingBox></LoadingBox>}
                  {uploadError && (
                    <MessageBox variant="danger">{uploadError}</MessageBox>
                  )}
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter product description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group controlId="category">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter category"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="brand">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter brand"
                        value={brand}
                        onChange={(event) => setBrand(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="price">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter price"
                        value={price}
                        onChange={(event) => setPrice(event.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="countInStock">
                      <Form.Label>Count In Stock</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter count in stock"
                        value={countInStock}
                        onChange={(event) =>
                          setCountInStock(event.target.value)
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Button className="w-100 mt-3" type="submit">
                  Update
                </Button>
              </Form>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
