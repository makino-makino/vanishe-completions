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
  }

  henkan(target) {
    const hits = [];

    for (let dictinoary of this.dictinoaries) {
      for (let word of dictinoary) {
        console.log(target, word.hurigana);

        if (!word.hurigana.indexOf(target)) {
          hits.push(word.name);
        }
      }
    }

    return hits;
  }
}

module.exports = Henkan;
