"use strict";

const globalObject = {
    items: 0,
    size: 5,
    id: {},
    box: {},
};

const output = document.querySelector(".output");
const btn = document.querySelector("button");

output.addEventListener("dragenter", dragEnter);
output.addEventListener("dragover", dragOver);
output.addEventListener("dragleave", dragLeave);
output.addEventListener("drop", dragDrop);
btn.addEventListener("click", addDroper);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Gotovo");
    output.style.gridTemplateColumns = `repeat(${globalObject.size}, 1fr)`;
    output.style.gridTemplateRows = `repeat(${globalObject.size}, 1fr)`;
    for (let i = 0; i < globalObject.size; i++) {
        for (let j = 0; j < globalObject.size; j++) {
            createSquare();
        }
    }
    addDroper();
});

function createSquare() {
    const div = document.createElement("div");
    div.classList.add("box");
    output.append(div);
}

function addDroper() {
    globalObject.items++;
    const div = document.createElement("div");
    div.textContent = `ID ${globalObject.items}`;
    div.style.backgroundColor = `#${Math.floor(
        Math.random() * 16777216
    ).toString(16)}`;
    div.classList.add("item");
    div.setAttribute("id", `id${globalObject.items}`);
    div.setAttribute("draggable", true);
    div.addEventListener("dragstart", dragStart);
    const first = document.querySelector(".box");
    first.append(div);
}

function dragStart(event) {
    globalObject.id = event.target;
}

function dragEnter(event) {
    event.preventDefault();
    globalObject.box = event.target.closest(".box");
    globalObject.box.classList.add("drag-over");
}

function dragOver(event) {
    event.preventDefault();
    moveBox();
}

function dragLeave(event) {
    globalObject.box.classList.remove("drag-over");
    moveBox();
}

function dragDrop(event) {
    moveBox();
}

function moveBox() {
    const draggedElement = globalObject.id;
    globalObject.box.append(draggedElement);
    return draggedElement;
}
