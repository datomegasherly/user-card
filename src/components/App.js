import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUsers } from '../actions';
import Filter from './Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import User from './User';

export class App extends Component {
    componentDidMount (){
        let { getUsers } = this.props;
        getUsers();
    }
    render() {
        return (
            <Router>
                <div data-test="app-component">
                    <div className="container mt-2 mb-4 shadow p-3 mb-5 bg-white rounded">
                        <h3 >User Card</h3>
                        <hr className="divider py-1 bg-light" />
                        <Switch>
                            <Route path="/user/:type/:userId" component={User}></Route>
                            <Route path="/user/:userId" component={User}></Route>
                            <Route path="/">
                                <Filter />
                                <Users />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default connect(null, { getUsers })(App);