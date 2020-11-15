import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Users extends Component {
    render() {
        let { search, users } = this.props;
        return (
            <div className="container" data-test="users-component">
                <div className="row">
                {
                    users && users.length && users.map(user => {
                        if(!search || (search && (user.username.toString().toLowerCase().indexOf(search) >=0 || user.name.toString().toLowerCase().indexOf(search) >=0 || user.email.toString().toLowerCase().indexOf(search) >=0))){
                            return (
                                <div data-test="user-box-component" key={user.username} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 pt-2 pr-1 pl-1">
                                    <div className="card h6">
                                        <div className="card-header pl-1 pr-2">
                                            <svg width="1.25em" height="1.25em" viewBox="0 0 16 16" className="bi bi-award" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l-1.51-.229L8 1.126l-1.355.702-1.51.229-.684 1.365-1.086 1.072L3.614 6l-.25 1.506 1.087 1.072.684 1.365 1.51.229L8 10.874l1.356-.702 1.509-.229.684-1.365 1.086-1.072L12.387 6l.248-1.506-1.086-1.072-.684-1.365z"/>
                                                <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                                            </svg>
                                            <b> {user.username}</b>
                                            <div className="float-right">
                                                <Link to={`/user/${user.id}`}><button className="btn btn-info btn-sm">Details</button></Link>
                                            </div>
                                        </div>
                                        <div className="m-2">
                                            <div>Name :</div>
                                            <div className="float-right"><b>{user.name}</b></div>
                                        </div>
                                        <div className="m-2">
                                            <div>Email :</div>
                                            <div className="float-right"><b>{user.email}</b></div>
                                        </div>
                                        <div className="m-2">
                                            <div>Phone :</div>
                                            <div className="float-right"><b>{user.phone}</b></div>
                                        </div>
                                        <div className="text-right">
                                            <Link to={`/user/edit/${user.id}`}><button className="ml-2 mb-2 btn btn-warning btn-sm">Edit</button></Link>
                                            <Link to={`/user/delete/${user.id}`}><button className="ml-2 mr-2 mb-2 btn btn-danger btn-sm">Delete</button></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { search, users } = state;
    return { search, users };
}

export default connect(mapStateToProps)(Users);