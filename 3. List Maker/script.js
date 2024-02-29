"use strict";

const curList = [];
const output = document.querySelector(".output");
const myInput = createMyElement(output, "input", "main");
const myBtn = createMyElement(output, "button", "btn");
const myList = createMyElement(output, "ol", "mylist");

myInput.setAttribute("type", "text");
myBtn.textContent = "Add New User";

myBtn.addEventListener("click", (event) => {
    let userName = myInput.value;
    if (userName.length > 3) {
        const li = addNewUser(userName);
    }
    myInput.value = "";
});
let getData = localStorage.getItem("curList");

window.addEventListener("DOMContentLoaded", (event) => {
    if (getData) {
        const tempArr = JSON.parse(getData);
        tempArr.forEach((item) => {
            addNewUser(item);
        });
    }
});

function updateItem() {
    const myListItems = document.querySelectorAll(".info");
    curList.length = 0;
    myListItems.forEach((item) => {
        curList.push(item.textContent);
    });
    localStorage.setItem("curList", JSON.stringify(curList));
}

function addNewUser(userName) {
    curList.push(userName);
    const li = createMyElement(myList, "li", "mylist-item");
    const div = createMyElement(li, "div", "container");
    const span1 = createMyElement(div, "span", "info");
    span1.textContent = userName;
    const span2 = createMyElement(div, "span", "editer");
    span2.textContent = "Edit";
    const span3 = createMyElement(div, "span", "delete");
    span3.textContent = "Delete";
    updateItem();
    return li;
}

function createMyElement(parent, elementType, classElementAdd) {
    const element = document.createElement(elementType);
    element.classList.add(classElementAdd);
    parent.append(element);
    return element;
}

myList.addEventListener("click", (event) => {
    const spanInfo = event.target.previousElementSibling;
    if (event.target.classList.contains("editer")) {
        if (event.target.textContent === "Edit") {
            spanInfo.style.backgroundColor = "yellow";
            spanInfo.setAttribute("contenteditable", true);
            event.target.textContent = "Save";
        } else {
            spanInfo.removeAttribute("style");
            spanInfo.removeAttribute("contenteditable");
            event.target.textContent = "Edit";
            updateItem();
        }
    }
    if (event.target.classList.contains("delete")) {
        event.target.closest(".mylist-item").remove();
        updateItem();
    }
});
