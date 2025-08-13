/* test-skipto.js */

const status = document.querySelector('output');

function handleFocusin(event) {
  event.currentTarget.classList.add('focus');
}

function handleFocusout(event) {
  event.currentTarget.classList.remove('focus');
}

function handleFocus(event) {
  status.value=`"${event.currentTarget.textContent}" got focus`;
}

function handleBlur(event) {
  status.value=`"${event.currentTarget.textContent}" lost focus`;
}

 class buttonTest extends HTMLElement {



  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({ mode: 'open' });

    const linkNode = document.createElement('link');
    linkNode.rel = 'stylesheet';
    linkNode.href = './css/test-skipto.css';
    this.shadowRoot.appendChild(linkNode);

    this.btn = document.createElement('button');
    this.btn.textContent = 'Test Button';
    this.btn.className = 'popup';
    this.shadowRoot.appendChild(this.btn);

    this.btn.addEventListener('focusin', handleFocusin);
    this.btn.addEventListener('focusout', handleFocusout);
    this.btn.addEventListener('focus', handleFocus);
    this.btn.addEventListener('blur', handleBlur);
  }
}

window.customElements.define('button-test', buttonTest);

window.addEventListener("load", (event) => {

  const btn = document.querySelector('button.popup');

  btn.addEventListener('focusin', handleFocusin);
  btn.addEventListener('focusout', handleFocusout);
  btn.addEventListener('focus', handleFocus);
  btn.addEventListener('blur', handleBlur);

});
