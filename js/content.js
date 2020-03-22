const TYPES = {
  INNER_TEXT: 'innerText',
  VALUE: 'value'
}

class ElementIO {
  constructor(element, type) {
    this.element = element;
    this.type = type;
  }
  
  read(msg) {
      console.log(this.element, this.type)
      return this.element[this.type];
  }

  write(msg) {
    this.element[this.type] = msg;
  } 
}

window.addEventListener('input', e => {
  const target = e.target

  var type = null

  if (target.value) 
    type = TYPES.VALUE;

  else if(target.innerText)
    type = TYPES.INNER_TEXT;

  else return;

  
  const io = new ElementIO(element=target, type=type);
  console.log(io.read());

}, false);
