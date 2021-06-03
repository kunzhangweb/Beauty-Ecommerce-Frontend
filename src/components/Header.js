import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Dropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/userActions";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-white">
            EverydayBeautyLab
          </Link>
        </Navbar.Brand>
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
                <Dropdown.Toggle variant="primary">
                  {userInfo.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/login" onClick={logoutHandler} className="text-dark">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
