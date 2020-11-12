import React from 'react';
import { storeFactory, getByAttr } from '../../test/testUtils';
import Users from './Users';
import { shallow } from 'enzyme';
import moxios from 'moxios';
import { userData } from '../helpers';
import { getUsers } from '../actions';

const setup = () => {
    let store = storeFactory();
    let wrapper = shallow(<Users store={store} />).dive().dive();
    return { store, wrapper };
}

/**
 * Use this function to get wrapper data after store dispatch completed
 * @param {store} store 
 */
const setupWithDefinedStore = store => {
    return shallow(<Users store={store} />).dive().dive();
}

describe('Test Users Component', () => {
    it('Render Users Component', () => {
        const { wrapper } = setup();
        const UsersComponent = getByAttr(wrapper, 'users-component');
        expect(UsersComponent.length).toBe(1);
    });
    it('Render users box', () => {
        const store = storeFactory();
        moxios.install();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData
            })
        });
        return store.dispatch(getUsers()).then(() => {
            const wrapper = setupWithDefinedStore(store);
            const UserBox = getByAttr(wrapper, 'user-box-component');
            expect(UserBox.length).toBe(1);
        })
    })
});