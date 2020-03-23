axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const SAMPLE_DICTIONARY = [
  {
    kaki: "ばにしぇだよ〜wwwwww",
    yomi: "ばにしぇだよ〜〜〜"
  },
  {
    kaki: "イー↓シャン↑リンチー↓チン↑シャオ↓ラー！(威嚇)",
    yomi: "いーしゃんりんちーしゃーおーらー"
  }
];

const NORMAL_DICTIONARIES = [SAMPLE_DICTIONARY];
const CLOUD_HENKAN_URLS = [
  "http://localhost:5000/ojichat",
  "http://localhost:5000/echo-sd"
];

class AbstractHenkan {
  constructor() {
    this.henkanIndex = 0;

    this.henkanList = [];
  }

  async generateHenkanList(diff) {
    throw new Error("No implementation");
  }

  async henkan(diff, selecter) {
    // selecter は-1か1

    console.log(this.henkanList.indexOf(diff), diff);
    if (this.henkanList.indexOf(diff) == -1) {
      this.henkanList = await this.generateHenkanList(diff);
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

  async generateHenkanList(diff) {
    const hits = [diff];

    const localDict = await getLocalStorage("dict");

    const dictinaries = NORMAL_DICTIONARIES.slice();
    dictinaries.push(localDict);

    console.log(dictinaries);

    for (let dictinoary of dictinaries) {
      for (let word of dictinoary) {
        if (!word.yomi.indexOf(diff)) {
          hits.push(word.kaki);
        }
      }
    }

    return hits;
  }
}

class CloudHenkan extends AbstractHenkan {
  constructor() {
    super();

    this.beforeMessage = "";
    this.henkanIndex = 0;
  }

  async generateHenkanList(diff) {
    const hits = [diff];

    for (let url of CLOUD_HENKAN_URLS) {
      const msg = encodeURIComponent(diff);
      const res = await axios.get(`${url}?msg=${msg}`);
      const converted = `${decodeURI(res.data.result)}\n`;
      hits.push(converted);
    }

    return hits;
  }
}

module.exports = Henkan;
