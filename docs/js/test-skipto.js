/* test-skipto.js */

const status = document.querySelector('output');

function handleFocusin(event) {
  event.currentTarget.classList.add('focus');
}

function handleFocusout(event) {
  event.currentTarget.classList.remove('focus');
}

function handleFocus(event) {
  status.value="Button got focus";
}

function handleBlur(event) {
  event.currentTarget.classList.remove('focus');
  status.value="Button lost focus";
}


window.addEventListener("load", (event) => {

  const btn = document.querySelector('button.popup');

  btn.addEventListener('focusin', handleFocusin);
  btn.addEventListener('focusout', handleFocusout);
  btn.addEventListener('focus', handleFocus);
  btn.addEventListener('blur', handleBlur);

});
