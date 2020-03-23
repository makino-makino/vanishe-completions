const KEYCODE = {
  F7: 118,
  F8: 119,
  ENETR: 13,
  SPACE: 32
};

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

update();

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
    const keyCode = e.keyCode;

    if ([KEYCODE.ENETR, KEYCODE.SPACE].indexOf(keyCode) != -1) {
      normalCompletion.diffTaker.commit(userInput);
    } else if (keyCode == KEYCODE.F7) {
      const result = await normalCompletion.complete();
      io.write(result);
    } else if (keyCode == KEYCODE.F8) {
      const result = await cloudCompletion.complete();
      io.write(result);
    }
  },
  true
);
