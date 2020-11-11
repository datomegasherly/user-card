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

export {
    searchUser,
    getUsers
}