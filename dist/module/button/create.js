export function createButton(container, text, onClick) {
  var button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', onClick);
  container.appendChild(button);
  return button;
}