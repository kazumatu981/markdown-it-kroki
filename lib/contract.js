'use strict';

module.exports = {
    /**
     * contract `test` to be non-empty string.
     * @param {string} test test string
     * @param {string} msg message on exception
     */
    toNonEmptyString: function (test, msg) {
        if (typeof test !== 'string') throw new Error(msg);
        if (test === ''
            || test === null
            || test === undefined) throw new Error(msg);
    },
    /**
     * contract `test` to be true.
     * @param {boolean} test test boolean. 
     * @param {sting} msg massage on excetion.
     */
    toTrue: function (test, msg) {
        if (typeof test !== 'boolean') throw new Error(msg);
        if (!test) throw new Error(msg);
    }
};