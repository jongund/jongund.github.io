/* test-skipto.js */

const log = document.querySelector('textarea');

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
    const node = tgt.querySelector('div.menu');
    if (node) {
      node.style.display = 'none';
    }
  }
}

function logOutput(msg, elem) {
  if (elem) {
    if (elem.hasAttribute('data-name')) {
      log.textContent =`"${elem.getAttribute('data-name')}" ${msg}\n` + log.textContent;
    }
    else {
      log.textContent=`"${elem.textContent}"  ${msg}\n` + log.textContent;
    }
  }
  else {
    log.textContent=`"${msg}\n` + log.textContent;
  }
}


function handleFocus(event) {
  const tgt = event.currentTarget;
  logOutput('has focus', tgt);
}

function handleBlur(event) {
  const tgt = event.currentTarget;
  logOutput('lost focus', tgt);
}

function handleClick(event) {
  const tgt = event.currentTarget;
  logOutput('click', tgt);
  const menuNode = tgt.parentNode.querySelector('div.menu');
  const rect = tgt.getBoundingClientRect();
    console.log(`${menuNode} ${rect.height} `);
  if (menuNode) {
    menuNode.style.top = (rect.height + 4) + 'px';
    if (menuNode.style.display === 'block') {
      menuNode.style.display = 'none';
    }
    else {
      menuNode.style.display = 'block';
    }
  }
}

function isOverButton(node, x, y) {
  const rect = node.getBoundingClientRect();

  return (rect.left <= x) &&
         (rect.right >= x) &&
         (rect.top <= y) &&
         (rect.bottom >= y);
}

function handleContainerPointerdown(event, containerNode) {

  const btn = containerNode.querySelector('button');

  if (isOverButton(btn, event.clientX, event.clientY)) {
    logOutput(`container pointer down(${event.pointerId}): over button `);
    containerNode.releasePointerCapture(event.pointerId);
  }
  else {
    logOutput(`container pointer down(${event.pointerId}): NOT over button`);
    containerNode.setPointerCapture(event.pointerId);
    containerNode.addEventListener('pointermove', (event) => {
      handleContainerPointermove(event, containerNode);
    });
    containerNode.addEventListener('pointerup', (event) => {
      handleContainerPointerup(event, containerNode);
    });
  }

  event.stopPropagation();
  event.preventDefault();
}

function handleContainerPointermove(event, containerNode) {
  logOutput(`"Container pointer move ${event.clientX}:${event.clientY}`);

  event.stopPropagation();
  event.preventDefault();
}

function handleContainerPointerup(event, containerNode) {
  logOutput(`"Container pointer up`);

  containerNode.releasePointerCapture(event.pointerId);
  containerNode.removeEventListener('pointermove', handleContainerPointermove);
  containerNode.removeEventListener('pointerup', handleContainerPointerup);

  event.stopPropagation();
  event.preventDefault();
}

function handleBodyPointerdown(event) {
  logOutput(`"Body pointer down`);
}


const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <div>
    <button>
      <slot name="name">Test Button</slot>
    </button>
   <div class="menu">Test Menu</div>
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
    this.div.addEventListener('pointerdown', (event) => {
      handleContainerPointerdown(event, this.div);
    }, true);

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
    div.addEventListener('pointerdown', (event) => {
      handleContainerPointerdown(event, div);
    }, true);
  });

  btns.forEach( (btn) => {
    btn.addEventListener('focus', handleFocus);
    btn.addEventListener('blur', handleBlur);
    btn.addEventListener('click', handleClick);
  });

});
