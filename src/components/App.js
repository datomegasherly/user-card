import React, { Component } from 'react';
import Filter from './Filter';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {
    render() {
        return (
            <div data-test="app-component">
                <div className="container mt-2 mb-4 shadow p-3 mb-5 bg-white rounded">
                    <h3 >User Card</h3>
                    <hr className="divider py-1 bg-light" />
                    <Filter />
                </div>
            </div>
        )
    }
}

export default App;