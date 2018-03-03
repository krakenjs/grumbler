'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createButton = createButton;
function createButton(container, text, onClick) {

    var button = document.createElement('button');

    button.innerText = text;
    button.addEventListener('click', onClick);

    container.appendChild(button);

    return button;
}