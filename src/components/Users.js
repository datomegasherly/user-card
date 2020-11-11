import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Users extends Component {
    render() {
        return (
            <div className="container" data-test="users-component">
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { users } = state;
    return { users };
}

export default connect(mapStateToProps, null)(Users);