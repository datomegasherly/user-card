import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchUser } from '../actions';
import { Link } from 'react-router-dom';

export class Filter extends Component {
    updateSearch = ev => {
        let { searchUser } = this.props;
        let search = ev.target.value;
        searchUser(search);
    }
    render() {
        let { search } = this.props;
        return (
            <div className="mt-2" data-test="filter-component">
                <div className="row">
                    <div className="col-4">
                        <input className="form-control" value={search} data-test="search-input" type="text" onChange={this.updateSearch} placeholder="Type to Search User" />
                    </div>
                    <div className="col-2 text-right">
                        <Link to={`/user/create/new`}><button className="btn btn-success btn-block">Create</button></Link>
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
