import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import { getUsers } from "../actions";
import Filter from "./Filter";
import "bootstrap/dist/css/bootstrap.min.css";
import Users from "./Users";
import User from "./User";

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUsers());
  }, []);
  const Base = () => {
    return (
      <>
        <Filter />
        <Users />
      </>
    );
  };
  return (
    <Router>
      <div data-test="app-component">
        <div className="container mt-2 mb-4 shadow p-3 mb-5 bg-white rounded">
          <h3>User Card</h3>
          <hr className="divider py-1 bg-light" />
          <Routes>
            <Route path="/user/:type/:userId" element={<User />}></Route>
            <Route path="/user/:userId" element={<User />}></Route>
            <Route path="/" element={<Base />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
