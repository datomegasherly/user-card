import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, getByAttr } from '../../test/testUtils';
import User from './User';

const setup = (props) => {
    let store = storeFactory();
    let wrapper = shallow(<User store={store} {...props} />).dive().dive();
    return { store, wrapper };
}

describe('Test User Component', () => {
    it('Render User Component', () => {
        let { wrapper } = setup({match: {params: 1}});
        let UserComponent = getByAttr(wrapper, 'user-component');
        expect(UserComponent.length).toBe(1);
    });
})