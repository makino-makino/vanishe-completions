const F7_KEYCODE = 118;
const F8_KEYCODE = 119;
const ENTER_KEYCODE = 13;
const SPACE_KEYCODE = 32;

const normalCompletion = new Completion({
  diffTaker: new DiffTaker(),
  henkan: new Henkan()
});

const cloudCompletion = new Completion({
  diffTaker: new DiffTaker(),
  henkan: new CloudHenkan()
});

var userInput = "";
var io = null;

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
    userInput = io.read();

    if ([ENTER_KEYCODE, SPACE_KEYCODE].indexOf(e.keyCode) != -1) {
      normalCompletion.diffTaker.commit(userInput);
    } else if (e.keyCode == F7_KEYCODE) {
      const result = await normalCompletion.complete();
      io.write(result);
    } else if (e.keyCode == F8_KEYCODE) {
      const result = await cloudCompletion.complete();
      io.write(result);
    }
  },
  true
);
