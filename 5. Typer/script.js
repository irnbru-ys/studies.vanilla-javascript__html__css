"use strict";

const main = document.querySelector(".main");
const typeArea = document.querySelector(".typer");
const btn = document.querySelector(".btn");
let win = document.createElement("div");

let scoreInfo =
    localStorage.getItem("bestScore") !== null
        ? localStorage.getItem("bestScore")
        : [];

const wording = [
    { word: "Do you like JavaScript", time: null },
    { word: "Have fun with Code", time: null },
];
const game = {
    word: null,
    start: 0,
    end: 0,
    user: "",
    arrText: "",
    totalTime: null,
    newRecord: false,
};

let bestScore = null;

if (scoreInfo.length > 0) {
    bestScore = JSON.parse(scoreInfo);
} else {
    bestScore = [];
}

typeArea.disabled = true;

btn.addEventListener("click", (event) => {
    if (btn.textContent === "Start") {
        playGame();
        typeArea.disabled = false;
        typeArea.value = "";
    } else if (btn.textContent === "Done") {
        typeArea.disabled = true;
        main.style.borderColor = "white";
        endGame();
        typeArea.value = "";
    }
});

function playGame() {
    let ranText = Math.floor(Math.random() * wording.length);
    game.word = ranText;
    console.log("game.word", game.word);
    main.textContent = wording[ranText].word;
    game.arrText = wording[ranText].word;
    main.style.borderColor = "red";
    btn.textContent = "Done";
    const date = new Date();
    game.start = date.getTime();
    game.newRecord = false;
}

function endGame() {
    const date = new Date();
    game.end = date.getTime();
    const totalTime = (game.end - game.start) / 1000;
    game.totalTime = totalTime;
    game.user = typeArea.value;
    const correct = checkResult();
    main.style.borderColor = "white";
    main.innerHTML = `Time: ${totalTime} Score: (${correct.score} out of ${correct.total})`;
    btn.textContent = "Start";
    if (game.newRecord) {
        win.textContent = `You showed the best result ${game.totalTime}`;
        win.classList.add("message");
        main.append(win);
    }
}

function checkResult() {
    let value1 = game.arrText.split(" ");
    let value2 = game.user.split(" ");
    let score = 0;
    value1.forEach((word, index) => {
        if (word === value2[index]) {
            score++;
        }
    });
    if (score === value1.length) {
        saveBestScore();
    }
    return { score, total: value1.length };
}

function saveBestScore() {
    let result = { word: game.word, bestTime: game.totalTime };

    if (scoreInfo.length === 0) {
        bestScore.push(result);
        localStorage.setItem("bestScore", JSON.stringify(bestScore));
        scoreInfo = JSON.parse(localStorage.getItem("bestScore"));
    } else {
        let check = bestScore.filter((item) => item.word === game.word);
        if (
            check.length > 0 &&
            bestScore[game.word].bestTime > result.bestTime
        ) {
            localStorage.setItem("bestScore", JSON.stringify(bestScore));
            game.newRecord = true;
        } else if (check.length === 0) {
            bestScore.push(result);
            localStorage.setItem("bestScore", JSON.stringify(bestScore));
            scoreInfo = JSON.parse(localStorage.getItem("bestScore"));
        }
    }
}
