import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Dropdown, Navbar } from "react-bootstrap";
import { Link, Route } from "react-router-dom";
import { logout } from "../actions/userActions";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { listProductCategories } from "../actions/productActions";
import SearchBox from "./SearchBox";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Button className="mx-1" onClick={() => setSidebarIsOpen(true)}>
            <i className="fa fa-bars"></i>
          </Button>
          <Navbar.Brand>
            <Link to="/" className="text-white">
              EverydayBeautyLab
            </Link>
          </Navbar.Brand>
          {/* search box */}
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="mx-3">
              <Link to="/cart">
                <i className="fa fa-shopping-cart fa-2x"></i>
                {cartItems.length > 0 && (
                  <div className="badge">{cartItems.length}</div>
                )}
              </Link>
            </Navbar.Text>
            <Navbar.Text>
              {userInfo ? (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" href="#">
                    {userInfo.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="/profile" className="text-dark">
                      User Profile
                    </Dropdown.Item>
                    <Dropdown.Item href="/orderhistory" className="text-dark">
                      Order History
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="#logout"
                      onClick={logoutHandler}
                      className="text-dark"
                    >
                      Log Out
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link to="/login" className="mx-3">
                  <i className="fa fa-sign-in fa-2x"></i>
                </Link>
              )}
            </Navbar.Text>
            {/* Seller options */}
            <Navbar.Text>
              {userInfo && userInfo.isSeller && (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" href="#">
                    Seller
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="/productlist/seller"
                      className="text-dark"
                    >
                      Products
                    </Dropdown.Item>
                    <Dropdown.Item
                      href="/orderlist/seller"
                      className="text-dark"
                    >
                      Orders
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Navbar.Text>
            {/* admin options */}
            <Navbar.Text>
              {userInfo && userInfo.isAdmin && (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" href="#">
                    <i className="fa fa-user" aria-hidden="true"></i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="/dashboard" className="text-dark">
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item href="/productlist" className="text-dark">
                      Products
                    </Dropdown.Item>
                    <Dropdown.Item href="/orderlist" className="text-dark">
                      Orders
                    </Dropdown.Item>
                    <Dropdown.Item href="/userlist" className="text-dark">
                      Users
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="wrapper">
        <nav id="sidebar" className={sidebarIsOpen ? "open" : ""}>
          <div className="sidebar-header mb-5">
            <div className="sidebar-title">
              Categories
              <Button
                className="close-sidebar mx-2"
                onClick={() => setSidebarIsOpen(false)}
              >
                <i className="fa fa-close"></i>
              </Button>
            </div>
          </div>

          <ul className="list-unstyled components">
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/search/category/${cat}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {cat}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
