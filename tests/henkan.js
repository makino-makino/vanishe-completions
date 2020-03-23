const Henkan = require("../js/henkan");

const henkan = new Henkan();

const testGenerateHenkanList = () => {
  const target = "ばにしぇ";
  const except = "ばにしぇだよ〜〜〜ｗｗｗｗｗ";

  const result = henkan.generateHenkanList(target);
  console.log(result[1] == except);
};

const testHenkan = () => {
  const target = "ばにしぇ";
  const except1 = "ばにしぇ";
  const except2 = "ばにしぇだよ〜〜〜ｗｗｗｗｗ";

  const result1 = henkan.henkan(target, 0);
  console.log(result1 == except1);

  const result2 = henkan.henkan(target, 1);
  console.log(result2 == except2);
};

console.log("generateHenkanList:");
testGenerateHenkanList();

console.log("testHenkan:");
testHenkan();
