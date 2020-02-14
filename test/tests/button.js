/* @flow */

import { createButton } from '../../src/index';

describe('button cases', () => {

    it('should create a button and listen for a click', (done) => {

        if (!document.body) {
            return done(new Error(`Expected document.body to be present`));
        }

        const button = createButton(document.body, 'click me', () => {
            done();
        });

        button.click();
    });
});
