'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;
const expect = require('chai').expect;

import { joinStrings, randomString } from '../../src/utils/string-utils';

describe('string-utils', () => {

  describe('#joinStrings', () => {
    it('joins two strings with a single space as separator', () => {
      expect(joinStrings(' ', 'foo', 'bar')).to.be.equal('foo bar');
    });
    it('joins strings and objects', () => {
      expect(joinStrings(', ', 'foo', { bar: true, duck: false }, 'baz', { quux: true })).to.be.equal('foo, bar, baz, quux');
    });
    it('does not join falsy arguments', () => {
      expect(joinStrings(' ', 'foo', undefined, null, {})).to.be.equal('foo');
    });
    it('returns an empty string if all arguments are falsy', () => {
      expect(joinStrings(',', '', undefined, null, {}, { bar: false, duck: false })).to.be.equal('');
    });
    it('should be eqal: [string, string] === [string, object]', () => {
      expect(joinStrings(',', 'foo-1', 'bar-2')).to.be.equal(joinStrings(',', 'foo-1', {'bar-2': true}));
    });
    it('joins strings without delimiters', () => {
      expect(joinStrings('', 'foo', 'bar')).to.be.equal('foobar');
    });
  });

  describe('#randomString', () => {
    it('returns a random string with a given length', () => {
      expect(randomString()).to.have.length(12);
    });
    it('generates two different strings', () => {
      expect(randomString(8)).to.not.equal(randomString(8));
    });
  });

});
