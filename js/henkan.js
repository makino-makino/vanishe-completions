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

    const updatedDictionary = await getLocalStorage("dict");
    const words = DEFAULT_DIRECTIES.concat(updatedDictionary);

    for (let word of words) {
      if (!word.yomi.indexOf(diff)) {
        hits.push(word.kaki);
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
      const converted = `${decodeURIComponent(res.data.result)}\n`;
      hits.push(converted);
    }

    return hits;
  }
}

module.exports = Henkan;
