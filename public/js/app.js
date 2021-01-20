const pageTurn = new Audio('/assets/pageturn.wav');

function playSound() {
    pageTurn.play();
};

const entryBtn = document.getElementById("entry-button");

entryBtn.addEventListener("click", (event)=>{
    playSound();
    event.preventDefault();
});