const Henkan = require("../js/henkan");

const henkan = new Henkan();

const testHenkan = () => {
  const target = "ばにしぇ";
  const except = "ばにしぇだよ〜〜〜ｗｗｗｗｗ";

  const result = henkan.henkan(target);

  console.log(result[0] == except);
};

testHenkan();
