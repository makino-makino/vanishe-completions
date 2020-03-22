window.addEventListener('input', e => {
  var inputValue = ''

  if (e.target.value) { 
    inputValue = e.target.value
    console.log('a')
  }

  else if(e.target.innerText) {
    inputValue = e.target.innerText
    console.log('b')
  }

  console.log(inputValue);
}, false);
