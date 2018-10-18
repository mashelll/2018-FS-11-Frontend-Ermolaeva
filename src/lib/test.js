function say(name) {
  const div = document.createElement('div');
  div.innerText = `Hello, ${name}!`
  document.body.appendChild(div);
};

export default say;
