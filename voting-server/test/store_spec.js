import {Map, fromJS, is} from 'immutable';
import {expect} from 'chai';

import makeStore from '../src/store.js';

describe('store', () => {
    it('is a Redux store configured with the correct reducer', () =>{
        const store = makeStore();
        expect(is(store.getState(),Map())).to.equal(true);

        store.dispatch({
            type: 'SET_ENTRIES',
            entries: ['Trainspotting', '28 Days Later']
        });
        expect(is(store.getState(),fromJS({
            entries: ['Trainspotting', '28 Days Later']
        }))).to.equal(true);
    });
});