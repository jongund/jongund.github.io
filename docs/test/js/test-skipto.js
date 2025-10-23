/* test-skipto.js */

const log = document.querySelector('textarea');

function logOutput(msg, elem) {
  if (elem) {
    if (elem.hasAttribute('data-name')) {
      log.textContent =`"${elem.getAttribute('data-name')}" ${msg.trim()}\n` + log.textContent;
    }
    else {
      log.textContent=`"${elem.textContent}"  ${msg.trim()}\n` + log.textContent;
    }
  }
  else {
    log.textContent=`"${msg.trim()}\n` + log.textContent;
  }
}

function handleFocusin(event) {
  const tgt = event.currentTarget;
  logOutput(`${tgt.tagName}: focusin`);
  if (tgt.classList.contains('popup')) {
    tgt.classList.add('focus');
  }
}

function handleFocusout(event) {
  const tgt = event.currentTarget;
  logOutput(`${tgt.tagName}: focusout`);
  if (tgt.classList.contains('popup')) {
    tgt.classList.remove('focus');
    const node = document.querySelector('.popup .menu');
    if (node) {
      node.style.display = 'none';
    }
  }
}

function handleFocus(event) {
  const tgt = event.currentTarget;
  tgt.parentNode.classList.add('focus');
  logOutput(`${tgt.tagName}: has focus`);
}

function handleBlur(event) {
  const tgt = event.currentTarget;
  tgt.parentNode.classList.remove('focus');
  logOutput(`${tgt.tagName}: lost focus`);
}

function handleClick(event) {
  const tgt = event.currentTarget;
  logOutput(`${tgt.tagName}: click`);

  if (tgt.hasAttribute('aria-expanded')) {
    if (tgt.getAttribute('aria-expanded') === 'true') {
      tgt.setAttribute('aria-expanded', 'false');
    }
    else {
     tgt.setAttribute('aria-expanded', 'true');
    }

    const menuNode = document.querySelector('.popup .menu');
    console.log(`${menuNode}`);

    if (menuNode) {
      if (tgt.getAttribute('aria-expanded') === 'false') {
        menuNode.style.display = 'none';
      }
      else {
        menuNode.style.display = 'block';
      }
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

function handleMainLinkFocus(event) {
  const tgt = event.currentTarget;
  tgt.parentNode.classList.remove('offscreen');
  logOutput(`${tgt.tagName}: has focus`);
}

function handleMainLinkBlur(event) {
  const tgt = event.currentTarget;
  tgt.parentNode.classList.add('offscreen');
  logOutput(`${tgt.tagName}: lost focus`);
}


const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <div class="main offscreen">
    <a href="#main">Main Content</a>
  </div>

  <div class="popup">
    <button
        aria-haspopup="menu"
        aria-expanded="false"
        aria-label="Button 1"
        aria-controls="menu1"
          >
      Button 1
    </button>
    <div id="menu1"
         role="menu"
         class="menu"
         aria-label="menu 1">
        <div role="menuitem" tabindex="-1">Menu item 1A</div>
        <div role="menuitem" tabindex="-1">Menu item 2B</div>
    </div>
  </div>
`;

const styleTemplate = document.createElement('template');
styleTemplate.innerHTML = `
  <style>
.popup {
  position: absolute;
  left: 10%;
  top: -26px;
  transition: top 0.35s ease;
  font-family: sans-serif, arial, helvetica;
  font-size: 12pt;
  display: block;
  border: none;
  margin-bottom: 4px;
  transition: left 1s ease;
  z-index: 100000 !important;
}

.popup.focus,
.popup:hover {
  top: 0;
}

.popup button {
  margin: 0;
  padding: 0.25em;
  border-width: 0px 1px 1px 1px;
  border-style: solid;
  border-radius: 0px 0px 6px 6px;
  border-color: light-dark(white, black);
  color: light-dark(black, white);
  background-color: light-dark(#ddd, #333);
  z-index: 100000 !important;
  font-family: $fontFamily;
  font-size: 12pt;
  z-index: 100001 !important;
}

.popup.focus button,
.popup button:focus {
  outline: none;
  border-color: light-dark(red, red);
}

.popup .menu {
  margin: .25em;
  padding: 0.25em;
  border: 1px solid green;
  touch-action: none;
  display: none;
  z-index: 200;
  color: blue;
  background: white;
}

.offscreen {
  position: absolute;
  top: -20px;
  left: -400px;
}
  </style>
}
`;

window.addEventListener("load", (event) => {

  const head = document.querySelector('head');
  const body = document.querySelector('body');

  const buttonClone = buttonTemplate.content.cloneNode(true);
  body.prepend(buttonClone);

  const div = document.querySelector('div.popup');
  const btn = document.querySelector('div.popup button');

  div.addEventListener('focusin', handleFocusin);
  div.addEventListener('focusout', handleFocusout);

  btn.addEventListener('focus', handleFocus);
  btn.addEventListener('blur', handleBlur);
  btn.addEventListener('click', handleClick);

  const textarea = document.querySelector('textarea');
  textarea.textContent = '';

  const mainLink = document.querySelector('div.main a');
  mainLink.addEventListener('focus', handleMainLinkFocus);
  mainLink.addEventListener('blur', handleMainLinkBlur);

  addStyleElement();

});

function addStyleElement () {

  const head = document.querySelector('head');

  const styleClone = styleTemplate.content.cloneNode(true);
  head.appendChild(styleClone);

}
