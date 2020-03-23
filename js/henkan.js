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

const DICTIONARIES = [SAMPLE_DICTIONARY];

class Henkan {
  constructor() {
    this.dictinoaries = DICTIONARIES;
    this.before_diff = "";
    this.henkanIndex = 0;

    this.henkanList = [];
  }

  generateHenkanList(target) {
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

module.exports = Henkan;
