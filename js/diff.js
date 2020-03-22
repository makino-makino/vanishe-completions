// オーダーなんてしらない
const getLastSameCharIndex = ({ longer, shorter }) => {
  for (let strIndex in shorter) {
    const index = Number(strIndex);

    const l = longer[index];
    const s = shorter[index];

    result = index;

    if (l != s) return index;
  }

  return shorter.length;
};

const takeDiff = ({ before, after }) => {
  var longer = null;
  var shorter = null;

  before = before.split("");
  after = after.split("");

  if (before.length > after.length) {
    longer = before;
    shorter = after;
  } else {
    longer = after;
    shorter = before;
  }

  const first = getLastSameCharIndex({ shorter, longer });

  const reversedLonger = longer.slice().reverse();
  const reversedShorter = shorter.slice().reverse();

  const last =
    after.length -
    getLastSameCharIndex({ shorter: reversedShorter, longer: reversedLonger });

  const diff = after.slice(first, last).join("");

  return { diff, first, last };
};

class DiffTaker {
  constructor() {
    this.before = "";
  }

  diff(msg) {
    const diff = takeDiff({ before: this.before, after: msg });
    return diff;
  }

  commit(msg) {
    this.before = msg;
  }
}

module.exports = { DiffTaker, takeDiff, getLastSameCharIndex };
