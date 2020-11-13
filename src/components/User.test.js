import React from 'react';
import { shallow } from 'enzyme';
import { storeFactory, getByAttr } from '../../test/testUtils';
import User from './User';
import { oneUserData, userData } from '../helpers';

const setup = props => {
    let store = storeFactory();
    let wrapper = shallow(<User store={store} {...props} />).dive().dive();
    return { store, wrapper };
}

const setupWithDefinedStore = (props, store) => {
    return shallow(<User store={store} {...props} />).dive().dive();
}

describe('Test User Component', () => {
    it('Render User Component', () => {
        let { wrapper } = setup({match: {params: 1}});
        let UserComponent = getByAttr(wrapper, 'user-component');
        expect(UserComponent.length).toBe(1);
    });
    it('Render "user-selected" when User exists', () => {
        const store = storeFactory({search: '', user: oneUserData, users: userData});
        const wrapper = setupWithDefinedStore({match: {params: 1}}, store);
        const UserSelected = getByAttr(wrapper, 'user-selected');
        expect(UserSelected.length).toBe(1);
    });
    it('Render "no-user-selected" when User does not exists', () => {
        const store = storeFactory({search: '', user: {id: -1}, users: userData});
        const wrapper = setupWithDefinedStore({match: {params: 'not exist'}}, store);
        const NoUserSelected = getByAttr(wrapper, 'no-user-selected');
        expect(NoUserSelected.length).toBe(1);
    });
})