import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";

import { detailUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // fetch user detail state
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, user, error } = userDetail;
  // set states of user
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // set states of seller
  const [sellerName, setSellerName] = useState("");
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState("");

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = userUpdateProfile;

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password entered do not match.");
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name: name,
          email: email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription
        })
      );
    }
  }; // end handleSubmit function

  return (
    <div className="m-auto w-50 min-vh-100">
      <Card className="mt-5">
        <Card.Body>
          <h2 className="text-center mb-4">User Profile</h2>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {updateLoading && <LoadingBox></LoadingBox>}
              {updateSuccess && (
                <MessageBox variant="success">
                  User's Profile Updated
                </MessageBox>
              )}
              {updateError && (
                <MessageBox variant="danger">{updateError}</MessageBox>
              )}
              {/* filling personal info */}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Please enter your name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Please enter email address"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter a password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
                <Form.Group id="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Please enter the password again"
                    onChange={(event) => setConfirmPassword(event.target.value)}
                  />
                </Form.Group>
                {/* input seller information */}
                { user.isSeller && (
                  <>
                    <h4>Seller</h4>
                    <Form.Group controlId="sellerName">
                      <Form.Label>Seller Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter seller name"
                        value={sellerName}
                        onChange={(event) => sellerName(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="sellerLogo">
                      <Form.Label>Seller Logo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please enter seller name"
                        value={sellerLogo}
                        onChange={(event) => sellerLogo(event.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="sellerDescrip">
                      <Form.Label>Seller Description</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Please descripe seller"
                        value={sellerName}
                        onChange={(event) => sellerDescription(event.target.value)}
                      />
                    </Form.Group>
                  </>
                )}
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
