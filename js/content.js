const diffTaker = new DiffTaker();
const F2_KEYCODE = 113;

var userInput = "";
var io = null;
const henkan = new Henkan();

window.addEventListener(
  "input",
  e => {
    const target = e.target;

    var type = null;

    if (target.value) type = TYPES.VALUE;
    else if (target.innerText) type = TYPES.INNER_TEXT;
    else return;

    io = new ElementIO(target, type);
    userInput = io.read();
  },
  false
);

window.addEventListener(
  "keydown",
  e => {
    if (e.keyCode == F2_KEYCODE) {
      const { diff, first, last } = diffTaker.diff(userInput);
      diffTaker.commit(userInput);

      const result = henkan.henkan(diff, 1);

      console.log(result);
    }
  },
  false
);
