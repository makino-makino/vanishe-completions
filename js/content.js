const diffTakerForNormal = new DiffTaker();
const diffTakerForCloud = new DiffTaker();

const F7_KEYCODE = 118;
const F8_KEYCODE = 119;
const ENTER_KEYCODE = 13;
const SPACE_KEYCODE = 32;

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
    doHenkan = async ({ henkan, diffTaker }) => {
      let { diff, first, last } = diffTaker.diff(userInput);

      const henkanedWord = await henkan.henkan(diff, 1);
      const result = diffTakerForNormal.apply({
        base: userInput,
        patch: henkanedWord,
        first,
        last
      });

      io.write(result);
      return { henkan, diffTaker };
    };

    userInput = io.read();

    if ([ENTER_KEYCODE, SPACE_KEYCODE].indexOf(e.keyCode) != -1) {
      diffTakerForNormal.commit(userInput);
    } else if (e.keyCode == F7_KEYCODE) {
      const result = await doHenkan({
        henkan: normalHenkan,
        diffTaker: diffTakerForNormal
      });

      henkan = result.henkan;
      diffTakerForCloud = result.diffTaker;
    } else if (e.keyCode == F8_KEYCODE) {
      const reult = await doHenkan({
        henkan: cloudHenkan,
        diffTaker: diffTakerForCloud
      });

      henkan = result.henkan;
      diffTakerForCloud = result.diffTaker;
    }
  },
  true
);
