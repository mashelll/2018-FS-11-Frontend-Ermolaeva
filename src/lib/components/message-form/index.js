import shadowStyles from './shadow.css';

const slotName = 'message-input';

const template = `
	<style>${shadowStyles.toString()}</style>
	<form>
		<form-input name="message_text" placeholder="Cообщение" slot="message-input">
			<span slot="icon"></span>
		</form-input>
	</form>
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
    //navigator.geolocation.getCurrentPosition(completion_function(position))
  }

  /*completion_function = funtion(position) {
     alert('Последний раз вас засекали здесь: ' + position.coords.latitude + ", " + position.coords.longitude);
  }*/

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
    //var message = this.shadowRoot.querySelector('div');
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
    this._elements.form.reset();
    //this._elements.form.message_text.innerText = '';
    if (!result[0]) return;
    var newMessage = document.createElement('div');
    newMessage.classList.add('result');
    this._elements.form.appendChild(newMessage);
    newMessage.innerText = result[0];
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
