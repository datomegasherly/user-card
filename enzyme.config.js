import '@babel/polyfill'; // add polyfill to enzyme config to use async/await in actions using redux thunk
import { configure } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({adapter: new EnzymeAdapter()});