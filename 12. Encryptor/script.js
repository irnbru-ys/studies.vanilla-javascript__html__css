"use strict";

const output = document.querySelector(".output");

const myInput = addElement(output, "input", "inputElement", false);
const btn1 = addElement(output, "button", "btn1", "Encrypt");
const btn2 = addElement(output, "button", "btn2", "Decrypt");
const message = addElement(output, "div", "message", "");

myInput.placeholder = "word(s) to be encrypted or decrypted";
myInput.value = "word(s) to be encrypted or decrypted";

btn1.addEventListener("click", encryption);
btn2.addEventListener("click", decryption);

function encryption() {
    let value = btoa(myInput.value);
    myInput.value = value;
    message.textContent = value;
}

function decryption() {
    let value = atob(myInput.value);
    myInput.value = value;
    message.textContent = value;
}

function addElement(parent, elementType, elementClass, html) {
    const element = document.createElement(elementType);
    if (elementClass) element.classList.add(elementClass);
    if (html) element.innerHTML = html;
    parent.append(element);
    return element;
}
