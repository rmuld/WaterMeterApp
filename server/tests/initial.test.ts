import assert from 'assert';
import { describe, it } from 'mocha';

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
    it('should return 0', () => {
      assert.equal([4, 2, 3].indexOf(4), 0);
    });    
  });
    describe('string comparsion', () => {
        it('should pass when strings are equal', () => {
            assert.equal('test', 'test');
          });
        it('should fail when strings are not equal', () => {
            assert.notEqual('test1', 'test');
          });
    })
});