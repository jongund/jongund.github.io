/* contact-dialog.js */

const template = document.createElement('template');
template.innerHTML = `
    <div class="contact-dialog">

      <button id="contact-button"
        aria-haspopup="true"
        aria-expanded="false"
        aria-controls="dialog"
        aria-live="off">
        <slot name="icon"></slot>
        <slot name="label">Contact</slot>
      </button>
      <a href="mailto:" id="mailto-link" tabindex="-1" aria-hidden="true"></a>
      <div role="dialog"
        tabindex="-1"
        id="dialog"
        aria-labelledby="title">
        <div class="header">
          <div id="title">Your Contact Information and Interest</div>
          <button id="close-button" aria-label="close" tabindex="-1">✕</button>
        </div>
        <form class="content">

          <label class="input" for="name-input">
              Name
          </label>
          <div class="input" required>
            <input id="name-input" type="text" size="30" maxlength="40" required/>
            <span class="required" aria-hidden="true">(required)</span>
          </div>

          <label class="input" for="email-input">
              E-mail
          </label>
          <div class="input" required maxlength="80">
            <input id="email-input" type="email" size="40" required/>
            <span class="required" aria-hidden="true">(required)</span>
          </div>

          <label class="input" for="phone-input" maxlength="20">
              Phone
          </label>
          <div class="input">
            <input id="phone-input" type="tel" size="14"/>
          </div>

          <fieldset class="interest">
            <legend>
              Interest
              <span class="required" aria-hidden="true">(required)</span>
            </legend>
            <label class="radio" for="interest-radio-workshop">
              <input required type="radio" name="interest" value="Workshop" id="interest-radio-workshop"/>
              Workshop
            </label>
            <label class="radio" for="interest-radio-consulting">
              <input type="radio" name="interest" value="Consulting" id="interest-radio-consulting"/>
              Consulting
            </label>
            <label class="radio" for="interest-radio-skipto">
              <input type="radio" name="interest" value="Open Soure Tools" id="interest-radio-skipto"/>
              Open Source Tools
            </label>
            <label class="radio" for="interest-radio-other">
              <input type="radio" name="interest" value="Other" id="interest-radio-other"/>
              Other
            </label>
          </fieldset>

          <label class="input" for="additional-textarea">
              Additional Information <span class="required">(maximum 400 Characters)</span>
          </label>
          <div class="input">
            <textarea id="additional-textarea" rows="4" maxlength="400"></textarea>
          </div>

          <div class="phone">
              You can also call: <span class="area">217</span>-<span class="number">840</span>-<span class="number">3956</span>
          </div>

          <div class="buttons">
            <button id="cancel-button">Cancel</button>
            <button id="send-button" type="submit">Send E-mail</button>
          </div>
        </form>
      </div>
    </div>
`;

class ContactButton extends HTMLElement {
  constructor () {
    super();
    this.attachShadow({ mode: 'open' });

    // Use external CSS stylesheet
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './css/contact-button.css');
    this.shadowRoot.appendChild(link);

    // Add DOM tree from template
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.contactName  = 'Open Web Accessibility Services Contact ';
    this.emailAddress = 'jongund@openweba11y.com';

    // Get references

    this.contactButton  = this.shadowRoot.querySelector('#contact-button');
    this.contactButton.addEventListener('click', this.onContactButtonClick.bind(this));

    this.mailtoLink  = this.shadowRoot.querySelector('#mailto-link');

    this.dialogDiv = this.shadowRoot.querySelector('[role="dialog"]');
    this.dialogDiv.addEventListener('keydown', this.onDialogKeydown.bind(this));

    this.nameInput     = this.shadowRoot.querySelector('#name-input');
    this.nameInput.addEventListener('keydown', this.onFirstControlKeydown.bind(this));

    this.emailInput         = this.shadowRoot.querySelector('#email-input');
    this.phoneInput         = this.shadowRoot.querySelector('#phone-input');
    this.interestRadios     = this.shadowRoot.querySelectorAll('fieldset.interest input[type=radio]');
    this.additionalTextarea = this.shadowRoot.querySelector('#additional-textarea');

    this.interestRadios.forEach( radio => {
      radio.addEventListener('focus', this.onFocus.bind(this));
      radio.addEventListener('blur', this.onBlur.bind(this));
    });

    this.closeButton = this.shadowRoot.querySelector('#close-button');
    this.closeButton.addEventListener('click', this.onCancelButtonClick.bind(this));

    this.cancelButton = this.shadowRoot.querySelector('#cancel-button');
    this.cancelButton.addEventListener('click', this.onCancelButtonClick.bind(this));

    this.sendButton = this.shadowRoot.querySelector('#send-button');
    this.sendButton.addEventListener('click', this.onSendButtonClick.bind(this));
    this.sendButton.addEventListener('keydown', this.onSendButtonKeydown.bind(this));

    window.addEventListener(
      'mousedown',
      this.onBackgroundMousedown.bind(this),
      true
    );
  }

  connectedCallback() {

    const buttonClass = this.getAttribute('data-button-class');
    if (buttonClass) {
      this.contactButton.classList.add(buttonClass);
    }

    const interest = this.getAttribute('data-interest');
    if ((typeof interest === 'string') && (interest.length)) {
      this.setInterest(interest);
    }

  }

  setInterest(interest) {
    for (let i = 0; i < this.interestRadios.length; i += 1) {
      const radioElem = this.interestRadios[i];
      if (radioElem.value.toLowerCase() === interest.trim().toLowerCase()) {
        radioElem.setAttribute('checked', '');
        return
      }
    }
  }

  getInterest() {
    for (let i = 0; i < this.interestRadios.length; i += 1) {
      const radioElem = this.interestRadios[i];
      if (radioElem.checked) {
        return radioElem.value;
      }
    }
    return 'Unknown Reason'

  }

  isValidInterest() {
    for (let i = 0; i < this.interestRadios.length; i += 1) {
      if (this.interestRadios[i].checked) {
        return true;
      }
    }
    return false;
  }

  getName() {
    return this.nameInput.value.trim();
  }

  isValidName() {
    const name = this.nameInput.value.trim()
    return name.length > 0;
  }

  getEmail() {
    return this.emailInput.value.trim();
  }

  isValidEmail() {
    const email = this.emailInput.value.trim();
    return email.length > 0 &&
           (email.indexOf('@') > 0) &&
           (email.indexOf('.') > 0);
  }

  getPhone() {
    const phone = this.phoneInput.value.trim();
    if (phone) {
      return phone;
    }
    return 'none';
  }

  getAdditional() {
    const additional = this.additionalTextarea.textContent.trim();
    if (additional) {
      return additional;
    }
    return 'none';
  }


  isFormValid() {
    if (!this.isValidName()) {
      this.nameInput.focus();
      return false;
    }
    if (!this.isValidEmail()) {
      this.emailInput.focus();
      return false;
    }
    if (!this.isValidInterest()) {
      this.interestRadios[0].focus();
      return false;
    }
    return true;
  }

  isOpen () {
    return this.contactButton.getAttribute('aria-expanded') === 'true';
  }

  openDialog () {
    this.dialogDiv.style.display = 'block';
    this.contactButton.setAttribute('aria-expanded', 'true');
    this.dialogDiv.focus();
  }

  closeDialog () {
    if (this.isOpen()) {
      this.contactButton.setAttribute('aria-expanded', 'false');
      this.dialogDiv.style.display = 'none';
      this.contactButton.focus();
    }
  }

  onContactButtonClick () {
    this.openDialog();
  }

  onCancelButtonClick () {
    this.closeDialog();
  }

  onSendButtonClick () {
    if (this.isFormValid()) {
      this.mailtoLink.href = `mailto:${this.emailAddress}`;
      this.mailtoLink.href += `?subject=${this.contactName} for ${this.getInterest()}`;
      this.mailtoLink.href += `&cc=${this.getEmail()}`;
      this.mailtoLink.href += `&body=Name: ${this.getName()}%0D%0A`;
      this.mailtoLink.href += `E-mail: ${this.getEmail()}%0D%0A`;
      this.mailtoLink.href += `Phone: ${this.getPhone()}%0D%0A%0D%0A`;
      this.mailtoLink.href += `Interest: ${this.getInterest()}%0D%0A%0D%0A`;
      this.mailtoLink.href += `Additional Information:%0D%0A${this.getAdditional()}%0D%0A`;
      this.closeDialog();
      this.mailtoLink.click();
    }
  }

  onDialogKeydown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    if ((event.currentTarget === event.target) &&
        (event.key === 'Tab') &&
        event.shiftKey) {
      this.sendButton.focus();
      event.stopPropagation();
      event.preventDefault();
    }

    if (event.key === 'Escape') {
      this.closeDialog();
    }
  }

  onFirstControlKeydown(event) {
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      if (event.key === 'Tab' && event.shiftKey) {
        this.sendButton.focus();
        event.stopPropagation();
        event.preventDefault();
      }
  }

  onSendButtonKeydown(event) {
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }

      if (event.key === 'Tab' && !event.shiftKey) {
        this.nameInput.focus();
        event.stopPropagation();
        event.preventDefault();
      }
  }

  onBackgroundMousedown(event) {
    if (this.isOpen()) {
      if (!this.contains(event.target)) {
        if (this.isOpen()) {
          this.closeDialog();
        }
      }
    }
  }

  onFocus (event) {
    const tgt = event.currentTarget;
    tgt.parentNode.classList.add('focus');
  }

  onBlur (event) {
    const tgt = event.currentTarget;
    tgt.parentNode.classList.remove('focus');
  }

}

customElements.define("contact-button", ContactButton);


