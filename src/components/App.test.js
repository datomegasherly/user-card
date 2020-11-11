import React from 'react';
import { shallow } from 'enzyme';
import { getByAttr, storeFactory } from '../../test/testUtils';
import App from './App';

const setup = () => {
    let store = storeFactory();
    let wrapper = shallow(<App store={store} />).dive();
    return { store, wrapper };
}
describe('Test App Component', () => {
    test('Render App Component', () => {
        let { wrapper } = setup();
        let AppComponent = getByAttr(wrapper, 'app-component');
        expect(AppComponent.length).toBe(1);
    });
});