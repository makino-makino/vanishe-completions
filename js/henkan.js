const SAMPLE_DICTIONARY = [
  {
    name: "ばにしぇだよ〜wwwwww",
    hurigana: "ばにしぇだよ〜〜〜"
  },
  {
    name: "イー↓シャン↑、リンチー↓チン↑シャオ↓ラー！(威嚇)",
    hurigana: "いーしゃんりんちーしゃーおーらー"
  }
];

const NORMAL_DICTIONARIES = [SAMPLE_DICTIONARY];

class AbstractHenkan {
  constructor() {
    this.henkanIndex = 0;

    this.henkanList = [];
  }

  generateHenkanList(diff) {
    throw new Error("No implementation");
  }

  henkan(diff, selecter) {
    // selecter は-1か1

    console.log(this.henkanList.indexOf(diff), diff);
    if (this.henkanList.indexOf(diff) == -1) {
      this.henkanList = this.generateHenkanList(diff);
      this.henkanIndex = 0;
    }

    if (!this.henkanList.length) return diff;

    this.henkanIndex += selecter;
    this.henkanIndex %= this.henkanList.length;

    const result = this.henkanList[this.henkanIndex];

    return result;
  }
}

class Henkan extends AbstractHenkan {
  constructor() {
    super();
  }

  generateHenkanList(diff) {
    const hits = [diff];

    for (let dictinoary of NORMAL_DICTIONARIES) {
      for (let word of dictinoary) {
        if (!word.hurigana.indexOf(diff)) {
          hits.push(word.name);
        }
      }
    }

    return hits;
  }
}

module.exports = Henkan;
