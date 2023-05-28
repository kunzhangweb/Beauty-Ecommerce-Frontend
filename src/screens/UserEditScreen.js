import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailUser, updateUserPrivilege } from "../actions/userActions";
import { UPDATE_USER_PRIVILEGE_RESET } from "../constants/userConstants";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  // load user information
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, user, error } = userDetail;
  // change user's priviledge
  const updatePrivilege = useSelector((state) => state.updatePrivilege);
  const {
    loading: updateLoading,
    success: updateSuccess,
    error: updateError,
  } = updatePrivilege;

  const dispatch = useDispatch();
useEffect(() => {
    if (updateSuccess) {
        dispatch({ type: UPDATE_USER_PRIVILEGE_RESET });
        props.history.push('/userlist');
    } 
    if (!user) {
       dispatch(detailUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsSeller(user.isSeller);
    }
}, [dispatch, props.history, updateSuccess, user, userId]);

// submit the change
const handleSubmit = (event) => {
    event.preventDefault();

    dispatch( updateUserPrivilege({ _id: userId, name, email, isAdmin, isSeller }) );
}

  return (
    <div className="m-auto w-50 min-vh-100">
      <Card className="mt-5">
        <Card.Body> 
          <h2 className="text-center mb-4">Edit { name } Privilege</h2>
          { updateLoading && <LoadingBox></LoadingBox> }
          { updateError && <MessageBox variant="danger">{ updateError }</MessageBox> }
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>           
          ) : (
            <>       
             {/* change authorizations */}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={ name }
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={ email }
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="isAdmin">
                <Form.Check
                  type="checkbox"
                  label="Is an Administrator"
                  checked={ isAdmin }
                  onChange={(event) => setIsAdmin(event.target.checked)}
                />
              </Form.Group>
              <Form.Group controlId="isSeller">
                <Form.Check
                  type="checkbox"
                  label="Is a Seller"
                  checked={ isSeller }
                  onChange={(event) => setIsSeller(event.target.checked)}
                />
              </Form.Group>
              
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
