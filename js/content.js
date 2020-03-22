const diffTaker = new DiffTaker();
const F2_KEYCODE = 113;

var userInput = "";

window.addEventListener(
  "input",
  e => {
    const target = e.target;

    var type = null;

    if (target.value) type = TYPES.VALUE;
    else if (target.innerText) type = TYPES.INNER_TEXT;
    else return;

    const io = new ElementIO(target, type);
    userInput = io.read();
  },
  false
);

window.addEventListener(
  "keydown",
  e => {
    if (e.keyCode == F2_KEYCODE) {
      const result = diffTaker.diff(userInput);
      diffTaker.commit(userInput);
    }
  },
  false
);
