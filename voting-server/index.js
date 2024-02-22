import makeStore from './src/store.js';
import startServer from './src/server.js';
import entries from './entries.json' assert {type : 'json'};

export const store = makeStore();
startServer(store);

store.dispatch({
    type: 'SET_ENTRIES',
    entries: entries
});
store.dispatch({type: 'NEXT'});