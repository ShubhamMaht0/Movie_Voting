import {List, Map, is} from 'immutable';
import {expect} from 'chai';

import {setEntries,next,vote} from '../src/core.js';

describe('application logic', () => {
    describe('setEntries', () => {

        it('adds the entries to the state', () => {
          const state = Map();
          const entries = List.of('Trainspotting', '28 Days Later');
          const nextState = setEntries(state, entries);
          expect(nextState.toJS()).to.deep.equal({
            entries: ['Trainspotting', '28 Days Later']
          });
        
        });
    
    });
    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting','28 Days Later','Sunshine')
            });
            const nextState = next(state);

            expect(nextState.toJS()).to.deep.equal({
                vote: {pair: ['Trainspotting','28 Days Later']},
                entries:['Sunshine']
            });
        });

        it('puts winner of current vote back to entries',()=>{
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting','28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List.of('Sunshine','Millions','127 Hours')
            });
            const nextState = next(state);
            expect(is(nextState,Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting')
            }))).to.equal(true);
        });

        it('puts both from tied vote back to entries',() =>{
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting':3,
                        '28 Days Later':3
                    })
                }),
                entries: List.of('Sunshine', 'Millions','127 Hours')
            });
            const nextState = next(state);
            expect(is(nextState,Map({
                vote: Map({
                    pair: List.of('Sunshine', 'Millions')
                }),
                entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
            }))).to.equal(true);
        });

        it('marks winner when just one entry left', () =>{
            const state = Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);
            expect(is(nextState,Map({
                winner: 'Trainspotting'
            }))).to.equal(true);
        });
    });
    describe('vote', () =>{
        it('creates a tally for the voted entry', () =>{
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });
            const nextState = vote(state, 'Trainspotting');
            expect(is(nextState,Map({
                    pair: List.of('Trainspotting','28 Days Later'),
                    tally: Map({
                        'Trainspotting': 1
                    })
            }))).to.equal(true);
        });

        it('adds to existing tally for the votes entry',()=>{
            const state = Map({
                    pair: List.of('Trainspotting', '28 Days Later'),
                    tally: Map({
                        'Trainspotting':3,
                        '28 Days Later':2
                    })
            });
            const nextState = vote(state, 'Trainspotting');
            expect(is(nextState,Map({
                    pair: List.of('Trainspotting','28 Days Later'),
                    tally: Map({
                        'Trainspotting':4,
                        '28 Days Later':2
                    })
            }))).to.equal(true);
        });
    });
});