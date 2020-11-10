import actionTypes from '../actionTypes';

const searchUser = search => {
    return {
        type: actionTypes.SEARCH_USER,
        payload: search
    }
}

export {
    searchUser
}