import actionTypes from '../actionTypes';
import axios from 'axios';

/**
 * update search user text
 * @param {string} search 
 */
const searchUser = search => {
    return {
        type: actionTypes.SEARCH_USER,
        payload: search
    }
}
/**
 * get Users data from jsonplaceholder
 */
const getUsers = () => {
    return async(dispatch) => {
        let users = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: actionTypes.USER_LIST,
            payload: users && users.data ? users.data : []
        });
    }
}
/**
 * get selected user to use in details and edit modes
 * @param {int} userId 
 */
const getUser = userId => {
    return (dispatch, getState) => {
        let { users } = getState();
        let payload = users.find(user => user.id == userId); // find selected user by userId variable
        if(!payload){
            payload = {
                id: -1 // user not found
            }
        }
        dispatch({
            type: actionTypes.SELECT_USER,
            payload
        });
    }
}

export {
    searchUser,
    getUsers,
    getUser
}