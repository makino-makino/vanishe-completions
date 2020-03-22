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
