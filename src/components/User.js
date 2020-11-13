import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../actions';
import { Link } from 'react-router-dom';

class User extends Component {
    /**
     * use "userLoaded" because of create a waiting to update users data in redux when directly call this page in react router
     */
    state = {
        userLoaded: false // use this variable in state to check if user is loaded
    }
    /**
     * use componentDidMount when load User component from click on details button , not directly
     */
    componentDidMount(){
        const { match: { params } } = this.props;
        const { users, getUser } = this.props;
        if(users.length){
            getUser(params.userId);
        }
    }
    /**
     * check if users data is loaded and userLoaded is still false , then change userLoaded to true and update selected user data
     * 
     * update in componentDidUpdate and not in render , because of below error :
     * Render methods should be a pure function of props and state
     */
    componentDidUpdate(){
        const { match: { params } } = this.props;
        const { users, getUser } = this.props;
        const { userLoaded } = this.state;
        if(users.length && !userLoaded){
            this.setState({ userLoaded: true }, () => {
                getUser(params.userId);
            });
        }
    }
    render() {
        const { user } = this.props;
        return (
            <div data-test="user-component">
                <div className="text-left">
                    <Link to="/"><button className="btn btn-info">Back</button></Link>
                    {
                        (!user || (user && !user.username)) ? '' :
                        <Fragment>
                            <Link to={`/user/edit/${user.id}`}><button className="ml-2 btn btn-warning">Edit</button></Link>
                            <Link to={`/user/delete/${user.id}`}><button className="ml-2 btn btn-danger">Delete</button></Link>
                        </Fragment>
                    }
                </div>
                {
                    (!user || (user && !user.username)) ?
                        <div data-test="no-user-selected" className="text-center mt-3">No User Selected</div> :
                        <div data-test="user-selected" className="card h6 mt-3">
                            <div className="card-header pl-1">
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                                <span className="pl-1">{user.username}</span>
                            </div>
                            <div className="card-body row">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                    <div className="mr-2">Name :</div>
                                    <div><b>{user.name}</b></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                    <div className="mr-2">Phone :</div>
                                    <div><b>{user.phone}</b></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                    <div className="mr-2">Website :</div>
                                    <div><b>{user.website}</b></div>
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                    <div className="mr-2">Email :</div>
                                    <div><b>{user.email}</b></div>
                                </div>
                                <div className="col-12 row">
                                    <div className="mr-2">Address :</div>
                                    <div><b>{user.address.city}, {user.address.street}, {user.address.suite},  {user.address.zipcode}</b></div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { users, user } = state;
    return {
        users,
        user
    }
}

export default connect(mapStateToProps, { getUser })(User);