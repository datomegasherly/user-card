import React from 'react';
import { userData } from './helpers';
import { storeFactory } from '../test/testUtils';
import moxios from 'moxios';
import { getUsers } from './actions';

describe('Integration Tests', () => {
    beforeEach(() => {
        moxios.install();
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: userData
            })
        })
    });
    test('update usersReducer when getUsers call', () => {
        let store = storeFactory();
        return store.dispatch(getUsers()).then(() => {
            const newState = store.getState();
            expect(newState.users).toStrictEqual(userData);
        })
    });
})