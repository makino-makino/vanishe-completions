const SAMPLE_DICTIONARY = [
  {
    name: "ばにしぇだよ〜〜〜ｗｗｗｗｗ",
    hurigana: "ばにしぇだよ〜〜〜"
  }
];

const DICTIONARIES = [SAMPLE_DICTIONARY];

class Henkan {
  constructor() {
    this.dictinoaries = DICTIONARIES;
    this.before_target = "";
    this.henkanIndex = 0;

    this.henkanList = [];
  }

  generateHenkanList(target) {
    console.log(target);
    const hits = [target];

    for (let dictinoary of this.dictinoaries) {
      for (let word of dictinoary) {
        if (!word.hurigana.indexOf(target)) {
          hits.push(word.name);
        }
      }
    }

    return hits;
  }

  henkan(target, selecter) {
    // selecter は-1か1
    if (target != this.before_target) {
      this.henkanList = this.generateHenkanList(target);
      this.henkanIndex = 0;
    }

    if (!this.henkanList.length) return target;

    this.henkanIndex += selecter;
    this.henkanIndex %= this.henkanList.length;

    return this.henkanList[this.henkanIndex];
  }
}

module.exports = Henkan;
