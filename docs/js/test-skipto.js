/* test-skipto.js */

const status = document.querySelector('output');

function handleFocusin(event) {
  event.currentTarget.classList.add('focus');
}

function handleFocusout(event) {
  event.currentTarget.classList.remove('focus');
}

function setOutput(elem, msg) {
  if (elem.hasAttribute('data-name')) {
    status.textContent=`"${elem.getAttribute('data-name')}" ${msg}`;
  }
  else {
    status.textContent=`"${elem.textContent}"  ${msg}`;
  }

}

function handleFocus(event) {
  setOutput(event.currentTarget, 'has focus');
}

function handleBlur(event) {
  setOutput(event.currentTarget, 'lost focus');
}

function handleClick(event) {
  setOutput(event.currentTarget, 'click');
}

const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <button>
    <slot name="name">Test Button</slot>
  </button>
`

class buttonTest extends HTMLElement {

  constructor() {
    // Always call super first in constructor
    super();
    this.attachShadow({ mode: 'open' });

    const linkNode = document.createElement('link');
    linkNode.rel = 'stylesheet';
    linkNode.href = './css/test-skipto.css';
    this.shadowRoot.appendChild(linkNode);

    const buttonClone = buttonTemplate.content.cloneNode(true);
    this.shadowRoot.appendChild(buttonClone);

    this.btn = this.shadowRoot.querySelector('button');

    const cn = this.getAttribute('data-class');
    if (cn) {
      this.btn.classList.add(cn);
    }

    const name = this.getAttribute('data-name');
    if (name) {
      this.btn.setAttribute('data-name', name);
    }

    if (this.hasAttribute('data-no-touch')) {
      this.btn.classList.add('no-touch');
    }

    this.btn.addEventListener('focusin', handleFocusin);
    this.btn.addEventListener('focusout', handleFocusout);
    this.btn.addEventListener('focus', handleFocus);
    this.btn.addEventListener('blur', handleBlur);
    this.btn.addEventListener('click', handleClick);
  }
}

window.customElements.define('button-test', buttonTest);

window.addEventListener("load", (event) => {

  const btns = Array.from(document.querySelectorAll('button'));

  btns.forEach( (btn) => {
    btn.addEventListener('focusin', handleFocusin);
    btn.addEventListener('focusout', handleFocusout);
    btn.addEventListener('focus', handleFocus);
    btn.addEventListener('blur', handleBlur);
    btn.addEventListener('click', handleClick);
  });

});
