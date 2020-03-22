const TYPES = {
  INNER_TEXT: "innerText",
  VALUE: "value"
};

class ElementIO {
  constructor(element, type) {
    this.element = element;
    this.type = type;
  }

  read(msg) {
    console.log(this.element, this.type);
    return this.element[this.type];
  }

  write(msg) {
    this.element[this.type] = msg;
  }
}
