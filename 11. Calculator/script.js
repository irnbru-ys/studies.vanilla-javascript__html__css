"use strict";

const output = document.querySelector(".output");
const keys = [
    "clear",
    "delete",
    "*",
    "/",
    "+",
    "-",
    "9",
    "8",
    "7",
    "6",
    "5",
    "4",
    "3",
    "2",
    "1",
    "0",
    ".",
    "=",
];
const spec = ["*", "/", "+", "-"];

output.style.maxWidth = "600px";
output.style.margin = "auto";
output.style.border = "1px solid black";

const main = document.createElement("input");
main.setAttribute("type", "text");
main.classList.add("main");
output.append(main);

const container = document.createElement("div");
container.classList.add("container");
output.append(container);

keys.forEach((key) => {
    btnMaker(key, container);
});

container.addEventListener("click", addOutput);

function btnMaker(val, parentElement) {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.textContent = val;
    btn.value = val;
    parentElement.append(btn);
    return btn;
}

function addOutput(event) {
    if (event.target.classList.contains("container")) {
        return;
    }
    let value = event.target.value;
    let temp = main.value;
    let boo = true;
    let lastOne = temp.charAt(temp.length - 1);
    let limiter = 0;
    let limiter2 = 0;

    [...main.value].forEach((item) => {
        if (item === "." && limiter2 === 0 && limiter <= 1) {
            limiter++;
        }
        if (item === "." && limiter2 === 1 && limiter <= 2) {
            limiter++;
        }
        if (isNaN(item) && item !== "." && limiter2 <= 1) {
            limiter2++;
        }

        if (
            limiter2 === 2 ||
            (limiter2 === 0 && limiter > 1) ||
            (limiter2 === 1 && limiter > 2)
        ) {
            main.value = main.value.slice(0, temp.length - 1);
            boo = true;
        }
    });

    if (value === "delete") {
        main.value = main.value.slice(0, main.value.length - 1);
        boo = false;
    }

    if (value === "clear") {
        main.value = "";
        boo = false;
    } else if (value === "=") {
        if (limiter2 === 0) {
            return;
        } else {
            evalOutput();
            boo = false;
        }
    }
    if (isNaN(value) && temp.length === 0) {
        boo = false;
    }

    if (isNaN((lastOne) && isNaN(value))) {
        boo = false;
    }

	if (value === '.' && main.value.length <=1) {
		main.value = '0.';
		boo = false;
	}	
	
	if ((main.value[0] === '0') && (main.value[1] === '0')) {
		main.value = value;
		boo = false;
	}

	if ((main.value[0] === '0') && (!isNaN(main.value[1]) === true)) {
		main.value = `${lastOne}${value}`;
		boo = false;
	}

	if (lastOne === '.' && isNaN(value)) {
		main.value = main.value.slice(0, main.value.length - 1);
		boo = false;
	}

    if (boo && limiter <= 2 && limiter2 <= 1) {
        main.value += value;
		boo = false;
    }
}

function evalOutput() {
    if (main.value.length === 0) {
        return;
    }
    let step3 = 0;
    let step2;
    [...main.value].forEach((item) => {
        if (isNaN(item) && item !== ".") {
            step2 = item;
        }
    });
    let step1;
    if (step2 === "+") {
        step1 = main.value.split(/\+/);
        step3 = step1.reduce((acc, item) => (acc += Number(item)), 0);
    } else if (step2 === "-") {
        step1 = main.value.split(/\-/);
        step3 = step1.reduce((acc, item) => (acc -= Number(item)));
    } else if (step2 === "/") {
        step1 = main.value.split(/\//);
        step3 = step1.reduce((acc, item) => (Number(item)=== 0) ? 0 : (acc /= Number(item)));
    } else if (step2 === "*") {
        step1 = main.value.split(/\*/);
        step3 = step1.reduce((acc, item) => (acc *= Number(item)));
    }

    main.value = step3;
}
