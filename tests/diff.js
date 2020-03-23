/**
 * @todo ちゃんとしたunit testツールを利用する
 */

const { DiffTaker, takeDiff, getLastSameCharIndex } = require("../js/diff.js");

const testGetLastSameCharIndex1 = () => {
  const shorter = [1, 2, 3, 4, 5, 6];
  const longer = [1, 2, 3, 4, 4, 3, 2];

  const expected = 4;
  const result = getLastSameCharIndex({ longer, shorter });

  console.log(expected == result);
};

const testGetLastSameCharIndex2 = () => {
  const shorter = [2, 2, 3, 2, 1, 1];
  const longer = [1, 1, 2, 4, 4, 3, 2];

  const expected = 0;
  const result = getLastSameCharIndex({ longer, shorter });

  console.log(expected == result);
};

const testTakeDiff = () => {
  const before = "ばにしぇだぞ〜〜〜ｗｗｗｗｗ";
  const after = "ばにしぇってなんやねん";

  const diff_expected = "ってなんやねん";
  const diff_result = takeDiff({ before, after });

  console.log(diff_result.diff == diff_expected);
};

const testDiffTaker = () => {
  const diffTaker = new DiffTaker();

  const before = "ばにしぇだぞ〜〜〜ｗｗｗｗｗ";
  const after = "ばにしぇってなんやねん";

  const expected = "ってなんやねん";

  diffTaker.commit(before);
  const result = diffTaker.diff(after);

  console.log(result.diff == expected);

  const apply_excpected = "ばにしぇはおじさん";
  const apply_result = diffTaker.apply({
    base: after,
    patch: "はおじさん",
    first: result.first,
    last: result.last
  });

  // const apply_result2 = diffTaker.apply({
  //   base: apply_result,
  //   patch: "は神",
  //   first: result.first,
  //   last: result.last
  // });

  // const apply_result3 = diffTaker.apply({
  //   base: apply_result,
  //   patch: "はエンジニア",
  //   first: result.first,
  //   last: result.last
  // });

  // console.log(apply_result2);
  // console.log(apply_result3);

  console.log(apply_result == apply_excpected);
};

console.log("getLastSameCharIndex:");
testGetLastSameCharIndex1();

testGetLastSameCharIndex2();

console.log("takeDiff:");
testTakeDiff();

console.log("DiffTaker:");
testDiffTaker();
