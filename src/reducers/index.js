import { combineReducers } from 'redux';
import actionTypes from '../actionTypes';

/**
 * keep search field in filter component to filter users
 * @param {string} state 
 * @param {object} action 
 */
const searchReducer = (state = '', action) => {
    switch(action.type){
        case actionTypes.SEARCH_USER:
            return action.payload;
        default:
            return state;
    }
}
/**
 * get a user data to edit or remove
 * @param {object} state 
 * @param {object} action 
 */
const userReducer = (state = {}, action) => {
    switch(action.type){
        case actionTypes.SELECT_USER:
            return action.payload;
        default:
            return state;
    }
}
/**
 * get list of users
 * @param {array} state 
 * @param {object} action 
 */
const usersReducer = (state = [], action) => {
    switch(action.type){
        case actionTypes.USER_LIST:
        case actionTypes.EDIT_USER:
        case actionTypes.CREATE_USER:
            return action.payload;
        default:
            return state;
    }
}
export default combineReducers({
    search: searchReducer,
    user: userReducer,
    users: usersReducer
});