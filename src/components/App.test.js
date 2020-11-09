import React from 'react';
import { shallow } from 'enzyme';
import { getByAttr } from '../../test/testUtils';
import App from './App';

const setup = () => {
    return shallow(<App />);
}
describe('Test App Component', () => {
    test('Render App Component', () => {
        let wrapper = setup();
        let AppComponent = getByAttr(wrapper, 'app-component');
        expect(AppComponent.length).toBe(1);
    });
});