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

    this.showLessButton   = document.querySelector('#ID_SHOW_LESS');
    this.showMoreButton   = document.querySelector('#ID_SHOW_MORE');
    this.showAllButton = document.querySelector('#ID_SHOW_ALL');
    this.hideAllButton = document.querySelector('#ID_HIDE_ALL');

    document.addEventListener('keydown', this.keyDown.bind(this));

    this.showLessButton.addEventListener('click',   this.showLess.bind(this));
    this.showMoreButton.addEventListener('click',   this.showMore.bind(this));
    this.showAllButton.addEventListener('click', this.showToggle.bind(this));
    this.hideAllButton.addEventListener('click', this.showToggle.bind(this));

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
    console.log(`[showMore]`);
    for (let i = 0; i < this.moreElems.length; i += 1) {
      let moreElem = this.moreElems[i];
      if (moreElem.classList.contains('hide') ||
          moreElem.classList.contains('hideslow')) {
        console.log(`[more]: ${moreElem.textContent}`);
        moreElem.classList.remove('hide');
        moreElem.classList.remove('hideslow');
        this.updateShowButtons();
        return true;
      }
    }
    return false;
  }

  showAll () {
    console.log(`[showAll]`);
    for (let i = 0; i < this.moreElems.length; i +=1) {
      this.moreElems[i].classList.remove('hide');
      this.moreElems[i].classList.remove('hideslow');
    }
    this.updateShowButtons();
  }

  showLess () {
    console.log(`[showLess]`);
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
    console.log(`[hideAll]`);
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

  showToggle () {
    console.log(`[showToggle]: ${this.areAllVisible()}`);
    if (this.areAllVisible()) {
      this.hideAll();
      this.showAllButton.classList.remove('hide');
      this.hideAllButton.classList.add('hide');
    }
    else {
      this.showAll();
      this.hideAllButton.classList.remove('hide');
      this.showAllButton.classList.add('hide');
    }
  }

  updateShowButtons () {
    this.showLessButton.disabled = this.areAllHidden();
    this.showMoreButton.disabled = this.areAllVisible();

    this.resizeContent();
  }

  initMoreContent () {
    this.moreElems.forEach( elem => {
      elem.classList.add('hide');
    });

    if (this.moreElems.length) {
      this.showLessButton.classList.remove('hide');
      this.showMoreButton.classList.remove('hide');
      this.showAllButton.classList.remove('hide');
      this.updateShowButtons();
    }
  }

  showSlideURL () {
    const link = window.location.href;
    const elem = document.querySelector('.show-slide-url');

    console.log(`link: ${link}`);
    console.log(`elem: ${elem}`);

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

    console.log(`[keyDown][key]: ${event.key}`);

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
}

window.addEventListener( 'load', () => {
  new HTMLSlide();
});


