/* @flow */

export function createButton(container: HTMLElement, text: string, onClick: (event: Event) => void): HTMLElement {

    let button : HTMLElement = document.createElement('button');

    button.innerText = text;
    button.addEventListener('click', onClick);

    container.appendChild(button);

    return button;
}
