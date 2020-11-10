import React, { Component } from 'react';
import Filter from './Filter';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
    render() {
        return (
            <div data-test="app-component">
                <Filter />
            </div>
        )
    }
}

export default App;