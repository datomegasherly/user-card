import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getUser, editUser } from '../actions';
import { Link, Redirect } from 'react-router-dom';
import { checkValidation } from '../helpers';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

class User extends Component {
    /**
     * use "userLoaded" because of create a waiting to update users data in redux when directly call this page in react router
     */
    state = {
        userLoaded: false, // use this variable in state to check if user is loaded
        userState: {
            id: -1
        },
        redirect: false
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
        // set empty data when click on create user
        if(params.type == 'create'){
            this.setState({userState: {
                id: 0,
                username: '',
                name: '',
                phone: '',
                website: '',
                email: '',
                address: {
                    city: '',
                    street: '',
                    suite: '',
                    zipcode: ''
                }
            }, userLoaded: true});
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
        const { user, users, getUser } = this.props;
        const { userState, userLoaded } = this.state;
        if(users.length && !userLoaded){
            this.setState({ userLoaded: true }, () => {
                getUser(params.userId);
            });
        }
        // update userState with selected user data just in edit mode
        if(user && user.username && userState && !userState.username && params.type && params.type == 'edit'){
            this.setState({userState: user});
        }
    }
    /**
     * 
     * @param {string} type it can be 'edit' or 'create'
     */
    saveUser(type){
        let { users, editUser } = this.props;
        let { userState } = this.state;
        let { isValid, error } = checkValidation(userState, type, users);
        if(isValid){
            switch(type){
                case 'edit':
                    editUser(userState);
                    this.setState({redirect: true});
                case 'create':
                    
                    this.setState({redirect: true});
                break;
            }
        } else {
            Swal.fire({
                title: 'Error!',
                text: `Error in field ${error}`,
                icon: 'error',
                confirmButtonText: 'Ok'
              })
        }
    }
    updateInput = (ev) => {
        let { id, value } = ev.target;
        let { userState } = this.state;
        if(['city','street','suite','zipcode'].indexOf(id) >= 0){
            this.setState({userState: {...userState, address: {...userState.address, [id]: value}}});
        } else {
            this.setState({userState: {...userState, [id]: value}});
        }
    }
    /**
     * this function will show user data , when User Component is in view mode
     */
    showUser() {
        const { user } = this.props;
        return (
            <Fragment>
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
            </Fragment>
        )
    }
    /**
     * this function will edit user data , when User Component is in edit mode
     * @param {string} type will get type of user changes ( create / edit )
     */
    editUser(type) {
        const user = this.state.userState;
        let { redirect } = this.state;
        let { updateInput } = this;
        return (
            <Fragment>
            {
                redirect ? 
                    <Redirect to={`/user/${user.id}`} /> :
                    <Fragment>
                        <div className="text-left">
                            <Link to="/"><button className="btn btn-info">Back</button></Link>
                            {
                                ((!user || (user && !user.username)) && type != 'create') ? '' :
                                <Fragment>
                                    <Link to={`/user/${type}/${user.id ? user.id : 'new'}`}><button onClick={() => this.saveUser(type)} className="ml-2 btn btn-success">Save</button></Link>
                                </Fragment>
                            }
                        </div>
                        {
                            (!user || (user && user.id === -1)) ?
                                <div data-test="no-user-selected" className="text-center mt-3">No User Selected</div> :
                                <div data-test="user-selected" className="card h6 mt-3">
                                    <div className="card-header pl-1">
                                        {
                                            type == 'edit' ?
                                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-caret-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M6 12.796L11.481 8 6 3.204v9.592zm.659.753l5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                                </svg> : ''
                                        }
                                        {
                                                type == 'edit' ? <span className="pl-1">{user.username}</span> :
                                                <div className="container row">
                                                    <div><label htmlFor="username" className="mt-2 mr-2">User Name : </label></div>
                                                    <div><input id="username" className="form-control" onChange={updateInput} value={user.username} /></div>
                                                </div>
                                        }    
                                    </div>
                                    <div className="card-body row">
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                            <div className="mr-2 mt-2"><label htmlFor="name">Name :</label></div>
                                            <div><input id="name" className="form-control" onChange={updateInput} value={user.name} /></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                            <div className="mr-2 mt-2"><label htmlFor="phone">Phone :</label></div>
                                            <div><input id="phone" className="form-control" onChange={updateInput} value={user.phone} /></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                            <div className="mr-2 mt-2"><label htmlFor="website">Website :</label></div>
                                            <div><input id="website" className="form-control" onChange={updateInput} value={user.website} /></div>
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 mb-3 row">
                                            <div className="mr-2 mt-2"><label htmlFor="email">Email :</label></div>
                                            <div><input id="email" className="form-control" onChange={updateInput} value={user.email} /></div>
                                        </div>
                                        <div className="col-12 bg-light row ml-0">
                                            <div className="mr-2 mt-2 mb-3">Address</div>
                                        </div>
                                        <div className="col-12 row">
                                            <div className="col-sm-12 col-md-6 mt-2 row">
                                                <div className="mr-2 mt-2"><label htmlFor="city">City :</label></div>
                                                <div><input id="city" className="form-control" onChange={updateInput} value={user.address.city} /></div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mt-2 row">
                                                <div className="mr-2 mt-2"><label htmlFor="street">Street :</label></div>
                                                <div><input id="street" className="form-control" onChange={updateInput} value={user.address.street} /></div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mt-2 row">
                                                <div className="mr-2 mt-2"><label htmlFor="suite">Suite :</label></div>
                                                <div><input id="suite" className="form-control" onChange={updateInput} value={user.address.suite} /></div>
                                            </div>
                                            <div className="col-sm-12 col-md-6 mt-2 row">
                                                <div className="mr-2 mt-2"><label htmlFor="zipcode">ZipCode :</label></div>
                                                <div><input id="zipcode" className="form-control" onChange={updateInput} value={user.address.zipcode} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </Fragment>
            }
            </Fragment>
        )
    }
    render() {
        const { match: { params } } = this.props;
        return (
            <div data-test="user-component">
                { (!params.type || (params.type && params.type == 'delete')) ? this.showUser() : '' }
                { params.type && (params.type == 'create' || params.type == 'edit') ? this.editUser(params.type) : '' }
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

export default connect(mapStateToProps, { getUser, editUser })(User);