// variable declaration
const grid = document.querySelector(".grid");
const startbtn = document.getElementById("startbtn");
const resetbtn = document.getElementById("reset")
const zombie = document.createElement("img");
const controls = document.querySelector(".controls");
const score = document.querySelector("#score");
const chanceleft = document.querySelector("#chanceleft");
const gamemusic = new Audio("resources/music.mp3");
const hitaudio = new Audio("resources/hit.mp3");
zombie.setAttribute("src", "resources/zombie.png");
let timevar = 1000;
let point = 0;
let counter = 0;


// level selector
document.getElementById("easy").addEventListener("click", () => {
    timevar = 1000;
    document.getElementById("easy").classList.add("active_lvl");
    document.getElementById("medium").classList.remove("active_lvl");
    document.getElementById("hard").classList.remove("active_lvl");
});

document.getElementById("medium").addEventListener("click", () => { 
    timevar = 750;
    document.getElementById("medium").classList.add("active_lvl");
    document.getElementById("easy").classList.remove("active_lvl");
    document.getElementById("hard").classList.remove("active_lvl");
});

document.getElementById("hard").addEventListener("click", () => { 
    timevar = 500;
    document.getElementById("hard").classList.add("active_lvl");
    document.getElementById("medium").classList.remove("active_lvl");
    document.getElementById("easy").classList.remove("active_lvl");
 });


// creating gameboard
function createBoard() {
    for (let i = 0; i != 9; i++) {
        let card = document.createElement("img");
        card.setAttribute("src", "resources/blank.png");
        grid.appendChild(card);
    }
}


// gamelogic
function gameloop() {
    let zombiePosition = [Math.floor(Math.random() * 9)];
    let blank = (grid.childNodes[zombiePosition]);
    grid.replaceChild(zombie, blank);
    zombie.addEventListener("mousedown", scoreUp);
    setTimeout(() => grid.replaceChild(blank, zombie), timevar - 50);

    chanceleft.innerText = 100 - counter;
    if (counter >= 100) {
        clearInterval(interval);
        gamemusic.remove()
        controls.replaceChild(startbtn, resetbtn)
    }
    counter += 1;
}


// score counter and display
function scoreUp() {
    point += 1;
    score.textContent = point;
    // removing the event listner so that player dont get more than 1 point each turn
    zombie.removeEventListener("mousedown", scoreUp);
    hitaudio.play();
}


// function to start the game
function startGame() {
    counter = 1;
    chanceleft.innerText = 100;
    score.innerText = 0;
    gamemusic.play();
    controls.replaceChild(resetbtn, startbtn);
    interval = setInterval(gameloop, timevar);
}


createBoard();
startbtn.addEventListener("click", startGame);
resetbtn.remove();