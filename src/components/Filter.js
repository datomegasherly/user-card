import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../actions';

export class Filter extends Component {
    updateSearch = ev => {
        let { searchUser } = this.props;
        let search = ev.target.value;
        searchUser(search);
    }
    render() {
        return (
            <div className="container mt-2" data-test="filter-component">
                <div className="row">
                    <div className="col-4">
                        <input className="form-control" data-test="search-input" type="text" onChange={this.updateSearch} placeholder="Type to Search User" />
                    </div>
                    <div className="col-2 text-right">
                        <button className="btn btn-success btn-block">Create</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { search } = state;
    return { search };
}

export default connect(mapStateToProps, { searchUser })(Filter);
