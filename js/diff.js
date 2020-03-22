// オーダーなんてしらない
const getLastSameCharIndex = (longer, shorter) => {
  var result = null;

  shorter.forEach((value, index, list) => {
    if (result) return;

    const l = longer[index];
    const s = shorter[index];

    console.log(l, s);
    console.log(l != s);

    if (l != s) {
      result = index;
      return;
    }
  });

  return result;
};

const calcDiff = (before, after) => {
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

  const first = getLastSameCharIndex((longer = longer), (shorter = shorter));

  longer.reverse();
  shorter.reverse();

  const last = getLastSameCharIndex((longer = longer), (shorter = shorter));

  after.reverse();
  const diff = after.slice(first, after.length - last).join("");

  return { diff, first, last };
};

class CurrentDiff {
  constructor(io) {
    this.io = io;
    this.before = "";
  }

  read() {
    const msg = this.io.read();

    const diff = calcDiff((before = this.before), (after = msg));

    this.before = msg;

    return diff;
  }

  write(msg) {
    this.io.write(msg);
    this.reset();
  }
}

a = calcDiff("私、赤間です", "私はです");

console.log(a);
