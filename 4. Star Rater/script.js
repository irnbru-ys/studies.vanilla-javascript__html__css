"use strict";

let starsUl = null;
let output = null;
let starItem = null;
const main = document.querySelectorAll(".container");

main.forEach((item) => {
    starsUl = createElements(item, "ul", "stars");
    output = createElements(item, "div", "output");

    ["mouseover", "mouseout", "click"].forEach((item) => {
        starsUl.addEventListener(item, starRaate);
    });
    for (let i = 0; i < 5; i++) {
        let star = createElements(starsUl, "li", "star-item");
        star.innerHTML = "&#10029";
        star.starValue = i + 1;
    }
});

function starRaate(event) {
    starItem = event.target.closest(".stars").querySelectorAll(".star-item");
    const eventType = event.type;

    const classCheck = [...starItem].some((item) =>
        item.classList.contains("yellow")
    );

    if (eventType === "click") {
        if (classCheck) {
            for (let j = 0; j < 5; j++) {
                starItem[j].classList.remove("yellow");
            }
        }
        event.target
            .closest(".container")
            .querySelector(
                ".output"
            ).innerHTML = `You Rated this ${event.target.starValue} stars`;
        for (let i = 0; i < Number(event.target.starValue); i++) {
            starItem[i].classList.remove("orange");
            starItem[i].classList.add("yellow");
        }
    }

    if (classCheck) {
        return;
    } else {
        if (eventType === "mouseover") {
            for (let i = 0; i < Number(event.target.starValue); i++) {
                starItem[i].classList.add("orange");
            }
        }
        if (eventType === "mouseout") {
            for (let i = 0; i < Number(event.target.starValue); i++) {
                starItem[i].classList.remove("orange");
            }
        }
    }
}

function createElements(parent, elementType, myClass) {
    const element = document.createElement(elementType);
    element.classList.add(myClass);
    parent.append(element);
    return element;
}
