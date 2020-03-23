const Henkan = require("../js/henkan");

const henkan = new Henkan();

const testGenerateHenkanList = () => {
  const target = "ばにしぇ";
  const expected = "ばにしぇだよ〜wwwwww";

  const result = henkan.generateHenkanList(target);
  console.log(result)
  console.log(result[1] == expected);
};

const testHenkan = () => {
  const target = "ばにしぇ";
  const expected1 = "ばにしぇ";
  const expected2 = "ばにしぇだよ〜wwwwww";

  const result1 = henkan.henkan(target, 0);
  console.log(result1 == expected1);

  const result2 = henkan.henkan(target, 1);
  console.log(result2 == expected2);
};

console.log("generateHenkanList:");
testGenerateHenkanList();

console.log("testHenkan:");
testHenkan();
