const diffTaker = new DiffTaker();
const F7_KEYCODE = 118;
const F8_KEYCODE = 119;

// enter, esc, space, 矢印

var userInput = "";
var io = null;
var normalHenkan = new Henkan();
var cloudHenkan = new CloudHenkan();

window.addEventListener("input", e => {
  var type = null;

  const target = document.activeElement;

  if (target.value) type = TYPES.VALUE;
  else if (target.innerText) type = TYPES.INNER_TEXT;
  else return;

  io = new ElementIO(e.target, type);
});

window.addEventListener(
  "keyup",
  async e => {
    doHenkan = async henkan => {
      let { diff, first, last } = diffTaker.diff(userInput);
      const henkanedWord = await henkan.henkan(diff, 1);
      const result = diffTaker.apply({
        base: userInput,
        patch: henkanedWord,
        first,
        last
      });

      io.write(result);
      return henkan;
    };

    userInput = io.read();

    if ([13, 32].indexOf(e.keyCode) != -1) {
      diffTaker.commit(userInput);
    } else if (e.keyCode == F7_KEYCODE) {
      normalHenkan = await doHenkan(normalHenkan);
    } else if (e.keyCode == F8_KEYCODE) {
      cloudHenkan = await doHenkan(cloudHenkan);
    }
  },
  true
);
