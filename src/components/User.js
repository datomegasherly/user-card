import React, { Component } from 'react';
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
                    <Link to="/"><button className="btn btn-danger">Back</button></Link>
                </div>
                {
                    (!user || (user && !user.username)) ?
                        <div className="text-center">
                            No User Selected
                        </div> :
                        <div>
                            UserName : {user.username}
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