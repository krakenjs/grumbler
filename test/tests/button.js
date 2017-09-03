/* @flow */

import { assert } from 'chai';

import { createButton } from '../../src/index';

describe('button cases', () => {

    it('should create a button and listen for a click', (done) => {

        if (!document.body) {
            return done(new Error(`Expected document.body to be present`));
        }

        let button = createButton(document.body, 'click me', (event) => {
            assert.isOk(event);
            done();
        });

        button.click();
    });
});
