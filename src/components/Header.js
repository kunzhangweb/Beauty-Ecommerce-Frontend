import React from "react";
import { useSelector } from "react-redux";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

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
              <i class="fa fa-shopping-cart fa-2x"></i>
              {cartItems.length > 0 && (
                <div className="badge">{cartItems.length}</div>              
              )}
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to="/signin" className="mx-3">
              <i class="fa fa-sign-in fa-2x"></i>
            </Link>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
