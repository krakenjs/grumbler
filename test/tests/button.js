/* @flow */

import { assert } from 'chai';
import { createButton } from 'src/index';

describe('button cases', () => {

    it('should create a button and listen for a click', (done) => {

        let button = createButton(document.body, 'click me', (event) => {
            assert.isOk(event);
            done();
        });

        button.click();
    });
});
