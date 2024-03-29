import { expect } from 'chai';
import { List, Map } from 'immutable';

describe('immutability', () => {
  describe('A List', () => {
    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState.get('movies').toJS()).to.deep.equal(
        ['Trainspotting', '28 Days Later', 'Sunshine']
      );
      expect(state.get('movies').toJS()).to.deep.equal(
        ['Trainspotting', '28 Days Later']
      );
    });
  });
});
