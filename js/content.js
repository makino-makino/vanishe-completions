const diffTaker = new DiffTaker();
const F7_KEYCODE = 118;
const F8_KEYCODE = 119;

// enter, esc, space, 矢印

var userInput = "";
var io = null;
const henkan = new Henkan();

window.addEventListener("input", e => {
  var type = null;

  const target = document.activeElement;

  if (target.value) type = TYPES.VALUE;
  else if (target.innerText) type = TYPES.INNER_TEXT;
  else return;

  io = new ElementIO(e.target, type);
});

window.addEventListener(
  "keydown",
  e => {
    userInput = io.read();

    if (e.keyCode == F7_KEYCODE) {
      diffTaker.commit(userInput);
    } else if (e.keyCode == F8_KEYCODE) {
      let { diff, first, last } = diffTaker.diff(userInput);
      const henkaned_word = henkan.henkan(diff, 1);
      const result = diffTaker.apply({
        base: userInput,
        patch: henkaned_word,
        first,
        last
      });

      io.write(result);
    }
  },
  true
);
