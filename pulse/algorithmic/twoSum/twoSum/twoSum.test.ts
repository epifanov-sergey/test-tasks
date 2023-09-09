import { twoSum } from './twoSum';

describe('two sum problem', () => {
  it.each([
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
  ])('case %s', (nums, target, expected) => {
    expect(twoSum(nums, target)).toStrictEqual(expected);
  });
});
