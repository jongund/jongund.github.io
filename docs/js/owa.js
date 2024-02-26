/* opena11y.js */

// Set aria-current=page
window.addEventListener('load', function () {
  const links = document.querySelectorAll('#mainNav a');
  const href = window.location.href;

  for (let i = 0; i < links.length; i += 1) {
    if (href.includes(links[i].href)) {
      links[i].setAttribute('aria-current', 'page');
    }
  }
});
