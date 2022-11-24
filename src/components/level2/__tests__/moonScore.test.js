import { describe, expect, it } from 'vitest';
import { getMoonScore } from '../utils/moonScore';

describe('getMoonScore', () => {
  it('should return blank for score 0', () => {
    const score = getMoonScore(0);
    expect(score).toBe('');
  });

  // TODO: Add missing test cases here
  // for ALL possible outputs of this helper function
  // Tip: don't repeat implementation details in the test
  // just rely on inputs/outputs

  it('should render 5 full moons if score 100', () => {
    const score = getMoonScore(100);

    // {n} matches the previous regex token exactly n times
    expect(score).toMatch(/^(🌕){5}$/);
  });

  it('should work with a string input', () => {
    const score = getMoonScore('80');
    expect(score).toMatch(/^(🌕){4}$/);
  });

  it('should render half moons for scores that end with 9', () => {
    const zero = getMoonScore('9');
    const one = getMoonScore('29');
    const two = getMoonScore('49');
    const three = getMoonScore('69');
    const four = getMoonScore('89');

    expect(zero).toMatch(/^🌗$/);
    expect(one).toMatch(/^🌕🌗$/);
    expect(two).toMatch(/^(🌕){2}🌗$/);
    expect(three).toMatch(/^(🌕){3}🌗$/);
    expect(four).toMatch(/^(🌕){4}🌗$/);
  });

  it('should scores 11 to 18 to 1 moon', () => {
    [11, 12, 13, 14, 15, 16, 17, 18].forEach((one) =>
      expect(getMoonScore(one)).toMatch(/^(🌕)$/)
    );
  });

  it('should throw an error for a negative input', () => {
    expect(() => getMoonScore(-50)).toThrowError('Invalid count value');
  });

  it('will render lots of moons', () => {
    const score = getMoonScore(40000);
    expect(score).toMatch(/^(🌕){2000}$/);
  });
});
