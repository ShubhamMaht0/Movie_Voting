const jsdom = require("jsdom");
const { JSDOM } = jsdom;
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = new JSDOM('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc.window.document;
global.window = win;
global.navigator = {
    userAgent: 'node.js',
};

if(typeof window !== 'undefined'){
    Object.keys(window).forEach((key) => {
        if (!(key in global)) {
            global[key] = window[key];
        }
    });
}
chai.use(chaiImmutable);