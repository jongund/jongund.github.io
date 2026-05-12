/* html-slides-2 */

class HTMLSlide {

  constructor () {
    this.mainElem = document.querySelector('main');
    this.navElem = document.querySelector('nav');
    this.footerElem = document.querySelector('footer');

    this.transcriptElem = document.querySelector('aside[aria-label]');
    this.hasTranscript = this.transcriptElem !== null;

    this.moreElems = document.querySelectorAll('.more');

    this.firstSlideLink    = document.querySelector('#ID_SLIDE_FIRST');
    this.lastSlideLink     = document.querySelector('#ID_SLIDE_LAST');
    this.nextSlideLink     = document.querySelector('#ID_SLIDE_NEXT');
    this.previousSlideLink = document.querySelector('#ID_SLIDE_PREVIOUS');

    this.showButtons   = document.querySelector('#ID_SHOW');

    this.showLessButton   = document.querySelector('#ID_SHOW_LESS');
    this.showMoreButton   = document.querySelector('#ID_SHOW_MORE');
    this.showAllButton = document.querySelector('#ID_SHOW_ALL');
    this.hideAllButton = document.querySelector('#ID_HIDE_ALL');

    document.addEventListener('keydown', this.keyDown.bind(this));

    this.showLessButton.addEventListener('click',   this.showLess.bind(this));
    this.showMoreButton.addEventListener('click',   this.showMore.bind(this));
    this.showAllButton.addEventListener('click', this.showAll.bind(this));
    this.hideAllButton.addEventListener('click', this.hideAll.bind(this));

    this.showLessButton.addEventListener('keydown',   this.keydownShowLess.bind(this));
    this.showAllButton.addEventListener('keydown', this.keydownShowAll.bind(this));
    this.hideAllButton.addEventListener('keydown', this.keydownHideAll.bind(this));

    window.addEventListener("resize", this.resizeContent.bind(this));

    this.showSlideURL();

    this.resizeContent();

    this.initMoreContent();

    this.mainElem.style.opacity = 1;

  }

  resizeContent() {

    this.mainElem.style.marginBottom = 4;

    const navHeight     = this.navElem.getBoundingClientRect().height;
    const mainHeight = this.mainElem.getBoundingClientRect().height;
    const transcriptHeight = this.hasTranscript ?
                             this.transcriptElem.getBoundingClientRect().height :
                             0;

    const footerHeight = this.footerElem.getBoundingClientRect().height;

    const windowHeight  = window.innerHeight;

    const space = windowHeight - navHeight - (1.5 * footerHeight) - transcriptHeight - mainHeight;

    // resize HTML Slide to fit window
    if( (space > 0) && (windowHeight > space)) {
      this.mainElem.style.marginBottom = space + 'px';
    }
  }

  showMore () {
    for (let i = 0; i < this.moreElems.length; i += 1) {
      let moreElem = this.moreElems[i];
      if (moreElem.classList.contains('hide') ||
          moreElem.classList.contains('hideslow')) {
        moreElem.classList.remove('hide');
        moreElem.classList.remove('hideslow');
        this.updateShowButtons();
        return true;
      }
    }
    return false;
  }

  showAll () {
    for (let i = 0; i < this.moreElems.length; i +=1) {
      this.moreElems[i].classList.remove('hide');
      this.moreElems[i].classList.remove('hideslow');
    }
    this.updateShowButtons();
  }

  showLess () {
    for (let i = this.moreElems.length-1; i >= 0; i -=1) {
      let moreElem = this.moreElems[i];
        if (!moreElem.classList.contains('hide') &&
            !moreElem.classList.contains('hideslow')) {
          moreElem.classList.add('hideslow');
          this.updateShowButtons();
          return true;
        }
    }
    return false;
  }

  hideAll () {
    for (let i = 0; i < this.moreElems.length; i +=1) {
      this.moreElems[i].classList.add('hideslow');
    }
    this.updateShowButtons();
  }

  areAllVisible () {
    for (let i = 0; i < this.moreElems.length; i += 1) {
      if (this.moreElems[i].classList.contains('hide') ||
        this.moreElems[i].classList.contains('hideslow')) {
        return false;
      }
    }
    return true;
  }

  areAllHidden () {
    for (let i = 0; i < this.moreElems.length; i += 1) {
      if (!(this.moreElems[i].classList.contains('hide') ||
            this.moreElems[i].classList.contains('hideslow'))) {
        return false;
      }
    }
    return true;
  }

  updateShowButtons () {
    if (this.areAllVisible()) {
      this.showMoreButton.setAttribute('aria-disabled', 'true');
      this.showAllButton.setAttribute('aria-disabled', 'true');
    }
    else {
      this.showMoreButton.removeAttribute('aria-disabled');
      this.showAllButton.removeAttribute('aria-disabled');
    }

    if (this.areAllHidden()) {
      this.showLessButton.setAttribute('aria-disabled', 'true');
      this.hideAllButton.setAttribute('aria-disabled', 'true');
    }
    else {
      this.showLessButton.removeAttribute('aria-disabled');
      this.hideAllButton.removeAttribute('aria-disabled');
    }
    this.resizeContent();
  }

  initMoreContent () {
    this.moreElems.forEach( elem => {
      elem.classList.add('hide');
    });


    if (this.moreElems.length) {
      this.showButtons.classList.add('show');
      this.showLessButton.classList.remove('hide');
      this.showMoreButton.classList.remove('hide');
      this.showAllButton.classList.remove('hide');
      this.hideAllButton.classList.remove('hide');
      this.updateShowButtons();
    }
  }

  showSlideURL () {
    const link = window.location.href;
    const elem = document.querySelector('.show-slide-url');

    if (elem) {
      const span = document.createElement('span');
      span.textContent = 'Current slide URL:';
      elem.appendChild(span);
      const br = document.createElement('br');
      elem.appendChild(br);
      const a = document.createElement('a');
      a.href = link;
      a.textContent = link;
      elem.appendChild(a);
    }

  }

  keyDown (event) {

    if (!event.altKey &&
        !event.ctrlKey &&
        !event.metaKey) {

      switch (event.key) {

        // Support more key
        case ' ':
          if (event.shiftKey) {
            if (this.showLess()) {
              event.preventDefault();
            }
          }
          else {
            if (this.showMore()) {
              event.preventDefault();
            }
          }
          break;

        case 'ArrowDown':
          if (this.showMore()) {
            event.preventDefault();
          }
          break;

        case 'ArrowUp':
          if (this.showLess()) {
            event.preventDefault();
          }
          break;

        case 'ArrowLeft':
          if (this.previousSlideLink) {
            this.previousSlideLink.click();
          }
          break;

        case 'ArrowRight':
          if (this.nextSlideLink) {
            this.nextSlideLink.click();
          }
          break;

        case 'End':
          if (this.lastSlideLink) {
            this.lastSlideLink.click();
          }
          break;

        case 'Home':
          if (this.firstSlideLink) {
            this.firstSlideLink.click();
          }
          break;

        default:
          break;
      }
    }
  }

  keydownShowLess (event) {

    if (!event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        (event.key === ' ')) {
      this.showLess();
      event.preventDefault();
      event.stopPropagation();
    }

  }

  keydownShowAll (event) {
    if (!event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        (event.key === ' ')) {
      this.showAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  keydownHideAll (event) {
    if (!event.altKey &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        (event.key === ' ')) {
      this.hideAll();
      event.preventDefault();
      event.stopPropagation();
    }
  }

}

/**
 * @constructor SourceCode
 *
 * @desc  Creates source code of an example
 *
 * @property  location      Array  -  Object containing the keyCodes used by the slider widget
 * @property  code          Array  -  JQuery node object
 */

SourceCode = function () {
  this.location = new Array();
  this.code = new Array();
};

/**
 * @method add
 *
 * @desc  Adds source code
 */

SourceCode.prototype.add = function (locationId, codeId) {
  this.location[this.location.length] = locationId;
  this.code[this.code.length] = codeId;
};

/**
 * @method make
 *
 * @desc  Generates HTML content for source code
 */

SourceCode.prototype.make = function () {

  let nodeCode;
  let nodeLocation;

  for (let i = 0; i < this.location.length; i++) {

    nodeLocation = document.getElementById(this.location[i]);
    nodeCode = document.getElementById(this.code[i]);

    nodeLocation.className = 'sourcecode';
    this.createCode(nodeLocation, '', nodeCode, true);

  } // endfor

};

/**
 * @method createCode
 *
 * @desc  Specify the source code and the location of the source code
 *
 * @param  location   String   - id of element to put the source code
 * @param  spaces     String   - Any spaces to precede the source code
 * @param  node       Object   - DOM Element node to use to generate the source code
 */

SourceCode.prototype.createCode = function (location, spaces, node, first) {

  function hasText (s) {
    if (typeof s !== 'string') {return false;}

    for (var i = 0; i < s.length; i++) {
      let c = s[i];
      if (c !== ' ' && c !== '\n' && c !== '\r') {return true;}
    }
    return false;
  }

  function cleanText (s) {
    if (typeof s !== 'string') {return '';}

    s1 = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];

      if (c === '<') {
        c = '&lt;';
      }

      if (c === '>') {
        c = '&gt;';
      }

      s1 += c;
    }
    return s1;
  }

  let i, s;
  let count = 0;

  if (typeof first !== 'boolean') {
    first = false;
  }

  if (!first) {
    let nodeNameStr = node.nodeName.toLowerCase();

    location.innerHTML = location.innerHTML + '<br/>' + spaces + '&lt;' + nodeNameStr;

    for (i = 0; i < node.attributes.length; i++) {

      location.innerHTML = location.innerHTML + '&nbsp;' + node.attributes[i].nodeName + '="';
      location.innerHTML = location.innerHTML + node.attributes[i].value + '"';

      if (((i + 1) != node.attributes.length) && (node.attributes.length > 2)) {

        location.innerHTML = location.innerHTML + '<br/>' + spaces;

        for (let j = 2; j <= nodeNameStr.length; j++) {
          location.innerHTML = location.innerHTML + '&nbsp;';
        }

      } // endif

    } // endfor

    location.innerHTML = location.innerHTML + '&gt;';
  }

  for (i = 0; i < node.childNodes.length; i++) {

    let n = node.childNodes[i];

    switch (n.nodeType) {

      case Node.ELEMENT_NODE:
        this.createCode(location, spaces + '&nbsp;&nbsp;', n);
        count++;
        break;

      case Node.TEXT_NODE:
        if (hasText(n.nodeValue)) {
          s = cleanText(n.nodeValue);
          location.innerHTML = location.innerHTML + '<br/>' + spaces + '&nbsp;&nbsp;' + s;
        }
        count++;
        break;

      case Node.COMMENT_NODE:

        if (hasText(n.nodeValue)) {
          location.innerHTML = location.innerHTML  + '<br/>' + spaces + '&nbsp;&nbsp;' + '&lt;--&nbsp;&nbsp;' + n.nodeValue + '--&gt;';
        }
        count++;
        break;

    } // end switch

  } // end for

  if (!first) {
    if (count > 0) {
      location.innerHTML = location.innerHTML + '<br/>' + spaces + '&lt;/' + node.nodeName.toLowerCase();
      location.innerHTML = location.innerHTML + '&gt;';
    } // end if
  }

};

var sourceCode = new SourceCode();


window.addEventListener( 'load', () => {
  new HTMLSlide();
});


