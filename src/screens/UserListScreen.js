import React, { useEffect } from 'react'
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DETAIL_RESET } from '../constants/userConstants';

export default function UserListScreen(props) {
    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { 
        loading: loadingDelete, 
        success: successDelete, 
        error: errorDelete 
    } = userDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listUsers());
        dispatch({ type: USER_DETAIL_RESET });
    }, [dispatch, successDelete]);

    const deleteHandler = (user) => {
        if (window.confirm('Are you sure to delete the user?')) {
            dispatch(deleteUser(user._id));
        }
    }

    return (
    <div className="container min-vh-100 min-vw-100">
      <br />
      <h4>All Registered Users</h4>
      { loadingDelete && <LoadingBox></LoadingBox> }
      { errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox> }
      { successDelete && (
        <MessageBox variant="success">User Deleted Successfully</MessageBox>
      ) }
      <br />

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
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>SELLER</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          {/* { console.log(users)} */}
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin
                    ? "Yes"
                    : "No"}
                </td>
                <td>
                  {user.isSeller
                    ? "Yes"
                    : "No"}
                </td>
                <td>
                  <Button
                    className="mx-1"
                    variant="outline-warning"
                    onClick={ () => props.history.push(`/user/${user._id}/edit`) }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteHandler(user)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
    )
}
