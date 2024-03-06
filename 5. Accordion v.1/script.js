"use strict";

const output = document.querySelector(".output");
const textContentItems = document.querySelectorAll(".mytext");

output.addEventListener("click", (event) => {
    if (
        event.target.classList.contains("title") &&
        !event.target.nextElementSibling.classList.contains("active")
    ) {
        textContentItems.forEach((item) => {
            if (event.target.nextElementSibling === item) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    } else if (
        event.target.classList.contains("title") &&
        event.target.nextElementSibling.classList.contains("active")
    ) {
        event.target.nextElementSibling.classList.remove("active");
    }
});
