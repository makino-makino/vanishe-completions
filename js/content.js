const diffTaker = new DiffTaker();
const F2_KEYCODE = 113;

var userInput = "";
var io = null;
const henkan = new Henkan();

const reloadUserInput = () => {
  var type = null;

  const target = document.activeElement;

  if (target.value) type = TYPES.VALUE;
  else if (target.innerText) type = TYPES.INNER_TEXT;
  else return;

  io = new ElementIO(target, type);
  userInput = io.read();
  return userInput;
};

window.addEventListener("keypress", e => reloadUserInput, false);

window.addEventListener(
  "keydown",
  e => {
    if (e.keyCode == F2_KEYCODE) {
      reloadUserInput();

      let { diff, first, last } = diffTaker.diff(userInput);

      // diffTaker.commit(userInput);

      // console.log({ diff, first, last });

      const henkaned_word = henkan.henkan(diff, 1);

      // console.log(henkaned_word);

      const result = diffTaker.apply({
        base: userInput,
        patch: henkaned_word,
        first,
        last
      });

      io.write(result);
    }
  },
  false
);
