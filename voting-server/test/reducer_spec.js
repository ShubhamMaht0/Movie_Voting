import {Map, fromJS, is} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer.js';

describe('reducer', () =>{
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = {type: 'SET_ENTRIES', entries:['Trainspotting']};
        const nextState = reducer(initialState, action);

        expect(is(nextState,fromJS({
            entries: ['Trainspotting']
        }))).to.equal(true);
    });

    it('handels NEXT', () =>{
        const initialState = fromJS({
            entries: ['Trainspotting','28 Days Later']
        });
        const action = {type: 'NEXT'};
        const nextState = reducer(initialState, action );

        expect(is(nextState,fromJS({
            vote: {
                pair: ['Trainspotting','28 Days Later']
            },
            entries: []
        }))).to.equal(true);
    });

    it('handles VOTE',() =>{
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState,action);

        expect(is(nextState,fromJS({
            vote:{
                pair: ['Trainspotting','28 Days Later'],
                tally: {Trainspotting: 1}
            },
            entries: []
        }))).to.equal(true);
    });

    it('has an intial state',()=>{
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);
        expect(is(nextState,fromJS({
            entries: ['Trainspotting']
        }))).to.equal(true);
    });

    it('can be used with reduce',() =>{
        const actions = [
            {type: 'SET_ENTRIES', entries: ['Trainspotting','28 Days Later']},
            {type: 'NEXT'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'VOTE', entry: '28 Days Later'},
            {type: 'VOTE', entry: 'Trainspotting'},
            {type: 'NEXT'}
        ];
        const finalState = actions.reduce(reducer, Map());

        expect(is(finalState,fromJS({
            winner: 'Trainspotting'
        }))).to.equal(true);
    });
});