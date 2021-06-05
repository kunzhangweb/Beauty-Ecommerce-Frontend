import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { signup } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignupScreen(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch = useDispatch();
  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  const userSignup = useSelector((state) => state.userSignup);
  const { userInfo, loading, error } = userSignup;

  async function handleSubmit(event) {
    event.preventDefault();
    // password matching check
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("The password and the confirm password do not match!");
    } else {
      await dispatch(
        signup(
          nameRef.current.value,
          emailRef.current.value,
          passwordRef.current.value
        )
      );
    } // end if
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
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to={`/login?redirect=${redirect}`}>Log In</Link>
      </div>
    </div>
  );
}
