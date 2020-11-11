import React from 'react';
import { storeFactory, getByAttr } from '../../test/testUtils';
import Users from './Users';
import { shallow } from 'enzyme';

const setup = () => {
    let store = storeFactory();
    let wrapper = shallow(<Users store={store} />).dive().dive();
    return { store, wrapper };
}

describe('Test Users Component', () => {
    it('Render Users Component', () => {
        const { wrapper } = setup();
        const UsersComponent = getByAttr(wrapper, 'users-component');
        expect(UsersComponent.length).toBe(1);
    });
});