import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<div class="result"></div>
		<form-input name="message_text" placeholder="Cообщение" slot="message-input">
			<span slot="icon"></span>
		</form-input>
        	<input type="submit" value="Отправить">
		<input type="file" name="file">
`;

class MessageForm extends HTMLElement {
  constructor () {
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = template;
    this._initElements();
    this._addHandlers();
    if (!localStorage.getItem('.result')) {
      localStorage.setItem('.result', '');
    }
    this._elements.message.innerText = ``;
  }

  static get observedAttributes() {
    return [
      "action",
      "method"
    ]
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this._elements.form[attrName] = newVal;
  }

  _initElements () {
    var form = this.shadowRoot.querySelector('form');
    var message = this.shadowRoot.querySelector('.result');
    this._elements = {
      form: form,
      message: message
    };
  }

  _addHandlers () {
    this._elements.form.addEventListener('submit', this._onSubmit.bind(this));
    this._elements.form.addEventListener('keypress', this._onKeyPress.bind(this));
//    this._elements.inputSlot.addEventListener('slotchange', this._onSlotChange.bind(this));
  }

  _onSubmit (event) {
    const result = Array.from(this._elements.form.elements).map(el => el.value);
    this._elements.message.innerText = result[0];
    localStorage.setItem('.result', result[0]);
    event.preventDefault();
    return false;
  }

  _onKeyPress (event) {
    if (event.keyCode === 13) {
      this._elements.form.dispatchEvent(new Event('submit'));
    }
  }
}

customElements.define('message-form', MessageForm);
