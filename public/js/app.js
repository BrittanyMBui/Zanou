const pageTurn = new Audio('/assets/pageturn.mp3');

const button = document.querySelector('button');

button.addEventListener('click', function() {
    pageTurn.play();
})