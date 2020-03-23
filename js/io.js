const TYPES = {
  INNER_TEXT: "innerText",
  VALUE: "value"
};

const searchElementByText = (element, text) => {
  if (element.innerHTML == text) return element;
  else if (element.innerHTML == "") return null;

  for (let child of element.children) {
    const innerHTML = searchElementByText(child, text);

    if (innerHTML) return innerHTML;
  }

  return null;
};

class ElementIO {
  constructor(element, type) {
    this.element = element;
    this.type = type;
  }

  read() {
    return this.element[this.type];
  }

  write(msg) {
    if (this.type == TYPES.INNER_TEXT) {
      const target = searchElementByText(this.element, this.element.innerText);
      target.innerText = msg;
    } else {
      this.element[this.type] = msg;
    }
  }
}
