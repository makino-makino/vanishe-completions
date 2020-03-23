class Completion {
  constructor({ henkan, diffTaker }) {
    this.henkan = henkan;
    this.diffTaker = diffTaker;
  }

  async complete() {
    let { diff, first, last } = this.diffTaker.diff(userInput);

    const henkanedWord = await this.henkan.henkan(diff, 1);
    const result = this.diffTaker.apply({
      base: userInput,
      patch: henkanedWord,
      first,
      last
    });

    return result;
  }
}
