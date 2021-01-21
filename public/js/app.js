const pageTurn = new Audio('/assets/pageturn.wav');

function playSound() {
    pageTurn.play();
};

const entryBtn = document.querySelectorAll('#entry-button');

entryBtn.addEventListener('click', ()=>{
    playSound()
});