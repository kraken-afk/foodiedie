import { expect } from '@open-wc/testing';

const sum = (a: number, b: number): number => a + b;

describe('A Sample Test for Sum', () => {
  it('should return a + b value', () => {
    expect(sum(2, 3))
      .to.equal(5);
  });
});
