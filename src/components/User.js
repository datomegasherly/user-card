import React, { Component, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, editUser, createUser, deleteUser } from "../actions";
import { Link, withRouter } from "react-router-dom";
import { Navigate } from "react-router";
import { checkValidation } from "../helpers";
import { useParams } from "react-router";
const Swal = require("../sweetalert2.all.min");

const User = () => {
  const dispatch = useDispatch(); // create dispatch variable to update redux data
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const getParam = useParams();
  /**
   * use "userLoaded" because of create a waiting to update users data in redux when directly call this page in react router
   */
  const [params, setParams] = React.useState(getParam);
  const [userLoaded, setUserLoaded] = React.useState(false); // use this variable in state to check if user is loaded
  const [userState, setUserState] = React.useState({
    id: -1,
    username: "",
    name: "",
    phone: "",
    website: "",
    email: "",
    address: {
      city: "",
      street: "",
      suite: "",
      zipcode: "",
    },
  });
  const [redirect, setRedirect] = React.useState(false);
  const [redirectTo, setRedirectTo] = React.useState(false); // use on deleteUser redirect
  const [deleted, setDeleted] = React.useState(false);

  const checkValidationUser = (params) => {
    return (
      user.username &&
      !userState.username &&
      params.type &&
      params.type == "edit"
    );
  };

  const saveUserWhenIsValid = ({ type }) => {
    switch (type) {
      case "edit":
        dispatch(editUser(userState));
        //this.setState({redirect: true});
        break;
      case "create":
        dispatch(createUser(userState, this));
        break;
    }
  };

  /**
   *
   * @param {string} type it can be 'edit' or 'create'
   */
  const saveUser = (type) => {
    let { isValid, error } = checkValidation(userState);
    if (isValid) {
      saveUserWhenIsValid({ type });
    } else {
      Swal.fire({
        title: "Error!",
        text: `Error in field ${error}`,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const updateInput = (ev) => {
    let { id, value } = ev.target;
    if (["city", "street", "suite", "zipcode"].indexOf(id) >= 0) {
      setUserState({
        ...userState,
        address: { ...userState.address, [id]: value },
      });
    } else {
      setUserState({ ...userState, [id]: value });
    }
  };

  React.useEffect(() => {
    if (users.length) {
      dispatch(getUser(params.userId));
    }
    // set empty data when click on create user
    if (params.type == "create") {
      setUserState({
        id: 0,
        username: "",
        name: "",
        phone: "",
        website: "",
        email: "",
        address: {
          city: "",
          street: "",
          suite: "",
          zipcode: "",
        },
      });
      setUserLoaded(true);
    }
  }, []);

  /* check if users data is loaded and userLoaded is still false , then change userLoaded to true and update selected user data*/
  React.useEffect(() => {
    if (users.length && !userLoaded) {
      setUserLoaded(true);
      dispatch(getUser(params.userId));
    }
    // update userState with selected user data just in edit mode
    if (checkValidationUser(params)) {
      setUserState(user);
    }
  }, [users]);

  /**
   * this function will show user data , when User Component is in view mode
   */
  const ShowUser = () => {
    let redirectURL = redirectTo ? redirectTo : `/`;
    return redirect ? (
      <Navigate to={redirectURL} />
    ) : (
      <Fragment>
        <div className="text-left">
          <Link to="/">
            <button className="btn btn-info">Back</button>
          </Link>
          {!user || (user && !user.username) ? (
            ""
          ) : (
            <Fragment>
              <Link to={`/user/edit/${user.id}`}>
                <button className="ml-2 btn btn-warning">Edit</button>
              </Link>
              <Link to={`/user/delete/${user.id}`}>
                <button className="ml-2 btn btn-danger">Delete</button>
              </Link>
            </Fragment>
          )}
        </div>
        {!user || (user && !user.username) ? (
          <div data-test="no-user-selected" className="text-center mt-3">
            No User Selected
          </div>
        ) : (
          <div data-test="user-selected" className="card h6 mt-3">
            <div className="card-header pl-1">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-caret-right"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                />
              </svg>
              <span className="pl-1">{user.username}</span>
            </div>
            <div className="card-body row">
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                <div className="mr-2">Name :</div>
                <div>
                  <b>{user.name}</b>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                <div className="mr-2">Phone :</div>
                <div>
                  <b>{user.phone}</b>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                <div className="mr-2">Website :</div>
                <div>
                  <b>{user.website}</b>
                </div>
              </div>
              <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                <div className="mr-2">Email :</div>
                <div>
                  <b>{user.email}</b>
                </div>
              </div>
              <div className="col-12 row">
                <div className="mr-2">Address :</div>
                <div>
                  <b>
                    {user.address ?? user.address.city},{" "}
                    {user.address ?? user.address.street},{" "}
                    {user.address ?? user.address.suite},{" "}
                    {user.address ?? user.address.zipcode}
                  </b>
                </div>
              </div>
            </div>
          </div>
        )}
      </Fragment>
    );
  };

  /**
   * this function will edit user data , when User Component is in edit mode
   * @param {string} type will get type of user changes ( create / edit )
   */
  const EditUser = () => {
    const { type } = params;
    let redirectURL = `/user/${user.id}`;
    if (type == "create") redirectURL = "/";
    if (type == "delete") redirectURL = "/";
    return (
      <Fragment>
        {redirect ? (
          <Navigate to={redirectURL} />
        ) : (
          <Fragment>
            <div className="text-left">
              <Link to={user.id ? `/user/${user.id}` : "/"}>
                <button className="btn btn-info">Back</button>
              </Link>
              {(!user || (user && !user.username)) && type != "create" ? (
                ""
              ) : (
                <Fragment>
                  <Link to={`/user/${type}/${user.id ? user.id : "new"}`}>
                    <button
                      onClick={() => saveUser(type)}
                      className="ml-2 btn btn-success"
                    >
                      Save
                    </button>
                  </Link>
                </Fragment>
              )}
            </div>
            {!user || (user && user.id === -1) ? (
              <div data-test="no-user-selected" className="text-center mt-3">
                No User Selected
              </div>
            ) : (
              <div data-test="user-selected" className="card h6 mt-3">
                <div className="card-header pl-1">
                  {type == "edit" ? (
                    <svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      className="bi bi-caret-right"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                  {type == "edit" ? (
                    <span className="pl-1">{user.username}</span>
                  ) : (
                    <div className="container row">
                      <div>
                        <label htmlFor="username" className="mt-2 mr-2">
                          User Name :{" "}
                        </label>
                      </div>
                      <div>
                        <input
                          id="username"
                          className="form-control"
                          onChange={updateInput}
                          value={user.username}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="card-body row">
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                    <div className="mr-2 mt-2">
                      <label htmlFor="name">Name :</label>
                    </div>
                    <div>
                      <input
                        id="name"
                        className="form-control"
                        onChange={updateInput}
                        value={user.name}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                    <div className="mr-2 mt-2">
                      <label htmlFor="phone">Phone :</label>
                    </div>
                    <div>
                      <input
                        id="phone"
                        className="form-control"
                        onChange={updateInput}
                        value={user.phone}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                    <div className="mr-2 mt-2">
                      <label htmlFor="website">Website :</label>
                    </div>
                    <div>
                      <input
                        id="website"
                        className="form-control"
                        onChange={updateInput}
                        value={user.website}
                      />
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                    <div className="mr-2 mt-2">
                      <label htmlFor="email">Email :</label>
                    </div>
                    <div>
                      <input
                        id="email"
                        className="form-control"
                        onChange={updateInput}
                        value={user.email}
                      />
                    </div>
                  </div>
                  <div className="col-12 bg-light row ml-0">
                    <div className="mr-2 mt-2 mb-3">Address</div>
                  </div>
                  <div className="col-12 row">
                    <div className="col-sm-12 col-md-6 mt-2 row">
                      <div className="mr-2 mt-2">
                        <label htmlFor="city">City :</label>
                      </div>
                      <div>
                        <input
                          id="city"
                          className="form-control"
                          onChange={updateInput}
                          value={user.address ? user.address.city : ""}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mt-2 row">
                      <div className="mr-2 mt-2">
                        <label htmlFor="street">Street :</label>
                      </div>
                      <div>
                        <input
                          id="street"
                          className="form-control"
                          onChange={updateInput}
                          value={user.address ? user.address.street : ""}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mt-2 row">
                      <div className="mr-2 mt-2">
                        <label htmlFor="suite">Suite :</label>
                      </div>
                      <div>
                        <input
                          id="suite"
                          className="form-control"
                          onChange={updateInput}
                          value={user.address ? user.address.suite : ""}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mt-2 row">
                      <div className="mr-2 mt-2">
                        <label htmlFor="zipcode">ZipCode :</label>
                      </div>
                      <div>
                        <input
                          id="zipcode"
                          className="form-control"
                          onChange={updateInput}
                          value={user.address ? user.address.zipcode : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };

  const DeleteUser = () => {
    props.history.push(`/user/${params.userId}`);
    Swal.fire({
      title: "Are you sure to delete this user ?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser({ _id: params.userId }));
        setRedirect(true);
      } else {
        setDeleted(false);
        /*this.setState({redirectTo: `/user/${params.userId}`}, () => {
                    this.setState({redirect: true});
                });*/
      }
    });
  };
  return (
    <div data-test="user-component">
      {!params.type || (params.type && params.type == "delete") ? (
        <ShowUser />
      ) : (
        ""
      )}
      {params.type && params.type == "delete" ? <DeleteUser /> : ""}
      {params.type && (params.type == "create" || params.type == "edit") ? (
        <EditUser />
      ) : (
        ""
      )}
    </div>
  );
};

export default User;
