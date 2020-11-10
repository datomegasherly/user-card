import React from 'react';
import { getByAttr, storeFactory } from '../../test/testUtils';
import Filter from './Filter';
import { shallow } from 'enzyme';

const setup = (state = {}) => {
    let store = storeFactory();
    let wrapper = shallow(<Filter store={store} />).dive().dive();
    wrapper.setState(state);
    return {store, wrapper};
}

describe('Test Filter Component', () => {
    const { store, wrapper } = setup();
    it('Render Filter Component', () => {
        const filterComponent = getByAttr(wrapper, 'filter-component');
        expect(filterComponent.length).toBe(1);
    });
    it('update searchReducer on change search-input', () => {
        const searchInput = getByAttr(wrapper, 'search-input');
        searchInput.simulate('change', {target: {value: 'test'}});
        let newState = store.getState();
        expect(newState.search).toEqual('test');
    });
});