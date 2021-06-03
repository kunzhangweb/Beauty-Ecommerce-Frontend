import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { login } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function LoginScreen(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading, error } = userLogin;

  async function handleSubmit(event) {
    event.preventDefault();

    await dispatch(login(emailRef.current.value, passwordRef.current.value));
  }

  // check userInfo
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);
  return (
    <div className="m-auto w-50">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Login In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
