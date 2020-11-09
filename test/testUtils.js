import checkPropTypes from 'check-prop-types';
import { createStore,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../src/reducers';

/**
 * @function storeFactory Set store for test purposes
 * @returns {Store} Redux store
 */
export const storeFactory = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
/**
 * @function getByAttr returns fined value in data-test
 * @param {shallowWrapper} wrapper - current wrapper who get from enzyme shallow wrapper
 * @param {String} value - name of data-test
 */
export const getByAttr = (wrapper, value) => {
    return wrapper.find(`[data-test="${value}"]`);
}
/**
 * @function checkPropType check custom prop types
 * @param {Component} component - current component to check
 * @param {String} customProp - current prop to check type in component
 */
export const checkPropType = (component, customProp) => {
    const result = checkPropTypes(component.propTypes, customProp, 'prop', component.name);
    expect(result).toBe(undefined);
}