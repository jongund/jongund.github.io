/* test-skipto.js */

const status = document.querySelector('output');

function handleFocusin(event) {
  const tgt = event.currentTarget;
  if (tgt.classList.contains('popup')) {
    tgt.classList.add('focus');
  }
}

function handleFocusout(event) {
  const tgt = event.currentTarget;
  if (tgt.classList.contains('popup')) {
    tgt.classList.remove('focus');
  }
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
  const tgt = event.currentTarget;
  setOutput(tgt, 'has focus');
}

function handleBlur(event) {
  const tgt = event.currentTarget;
  setOutput(tgt, 'lost focus');
}

function handleClick(event) {
  const tgt = event.currentTarget;
  setOutput(tgt, 'click');
}

const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <div>
    <button>
      <slot name="name">Test Button</slot>
    </button>
  </div>
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

    this.div = this.shadowRoot.querySelector('div');
    this.btn = this.shadowRoot.querySelector('button');

    if (this.hasAttribute('data-popup')) {
      this.div.classList.add('popup');
    }

    const name = this.getAttribute('data-name');
    if (name) {
      this.btn.setAttribute('data-name', name);
    }

    this.div.addEventListener('focusin', handleFocusin);
    this.div.addEventListener('focusout', handleFocusout);
    this.btn.addEventListener('focus', handleFocus);
    this.btn.addEventListener('blur', handleBlur);
    this.btn.addEventListener('click', handleClick);
  }
}

window.customElements.define('button-test', buttonTest);

window.addEventListener("load", (event) => {

  const divs = Array.from(document.querySelectorAll('div.popup'));
  const btns = Array.from(document.querySelectorAll('button'));

  divs.forEach( (div) => {
    div.addEventListener('focusin', handleFocusin);
    div.addEventListener('focusout', handleFocusout);
  });

  btns.forEach( (btn) => {
    btn.addEventListener('focus', handleFocus);
    btn.addEventListener('blur', handleBlur);
    btn.addEventListener('click', handleClick);
  });

});
