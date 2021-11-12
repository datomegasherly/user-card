import actionTypes from "../actionTypes";
import axios from "axios";

/**
 * update search user text
 * @param {string} search
 */
const searchUser = (search) => {
  return {
    type: actionTypes.SEARCH_USER,
    payload: search,
  };
};
/**
 * get Users data from jsonplaceholder
 */
const getUsers = () => {
  return async (dispatch) => {
    let users = await axios.get("http://localhost:8002/usercard"); //https://jsonplaceholder.typicode.com/users
    dispatch({
      type: actionTypes.USER_LIST,
      payload: users && users.data ? users.data : [],
    });
  };
};
const updateUser = (user, state) => {
  state.users.map((u) => {
    if (u.id == user.id) {
      u.name = user.name;
      u.website = user.website;
      u.phone = user.phone;
      u.email = user.email;
      u.address.city = user.address.city;
      u.address.street = user.address.street;
      u.address.suite = user.address.suite;
      u.address.zipcode = user.address.zipcode;
    }
  });
};
/**
 * update user after edit
 * @param {object} user
 */
const editUser = (user) => {
  return async (dispatch, getState) => {
    let state = getState();
    let editedUser = await axios.put(
      `http://localhost:8002/usercard/${user._id}`,
      user
    );
    if (editedUser.data.error) {
      Swal.fire(createdUser.data.error, "", "error");
    } else {
      updateUser(user, state);
      dispatch({
        type: actionTypes.EDIT_USER,
        payload: state.users,
      });
      Swal.fire("User Edited successfully", "", "success");
    }
  };
};
/**
 * add new user to users reducer after create
 * @param {object} user
 */
const createUser = (user, self) => {
  return async (dispatch, getState) => {
    let state = getState();
    let users = state.users;
    let createdUser = await axios.post("http://localhost:8002/usercard", user);
    if (createdUser.data.error) {
      Swal.fire(createdUser.data.error, "", "error");
    } else {
      users.push(createdUser.data.data[0]);
      dispatch({
        type: actionTypes.CREATE_USER,
        payload: users,
      });
      Swal.fire("User Created successfully", "", "success");
      self.props.history.replace(`/`);
      self.setState({ redirect: true });
    }
  };
};
/**
 * delete selected user
 * @param {object} user
 */
const deleteUser = (user) => {
  return async (dispatch, getState) => {
    let state = getState();
    let users = state.users;
    let deletedUser = await axios.delete(
      `http://localhost:8002/usercard/${user._id}`
    );
    if (deletedUser.data.error) {
      Swal.fire(deletedUser.data.error, "", "error");
    } else {
      let newUsers = users.filter((u) => u._id != user._id);
      dispatch({
        type: actionTypes.DELETE_USER,
        payload: newUsers,
      });
      Swal.fire("User Deleted successfully", "", "success");
    }
  };
};
/**
 * get selected user to use in details and edit modes
 * @param {int} userId
 */
const getUser = (userId) => {
  return (dispatch, getState) => {
    let { users } = getState();
    let payload = users.find((user) => user._id == userId); // find selected user by userId variable
    if (!payload) {
      payload = {
        id: -1, // user not found
      };
    }
    dispatch({
      type: actionTypes.SELECT_USER,
      payload,
    });
  };
};

export { searchUser, getUsers, getUser, editUser, createUser, deleteUser };
