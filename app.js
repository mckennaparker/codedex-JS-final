const waves = new Audio('/public/waves.wav');
const alarm = new Audio('/public/bells.wav');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const session = document.querySelector('.minutes');
let myInterval;
let totalSeconds;
let isRunning = false;
let originalMinutes = Number.parseInt(session.textContent);

const updateDisplay = () => {
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    if (secondsLeft < 10) {
        secondDiv.textContent = `0${secondsLeft}`;
    } else {
        secondDiv.textContent = `${secondsLeft}`;
    }
    minuteDiv.textContent = `${minutesLeft}`;
}

const startTimer = () => {
    if (!isRunning) {
        isRunning = true;
        totalSeconds = Number.parseInt(session.textContent) * 60;

        myInterval = setInterval(() => {
            totalSeconds--;

            if (totalSeconds >= 0) {
                updateDisplay();
            } else {
                clearInterval(myInterval);
                isRunning = false;
            }
        }, 1000);
    }
}

const pauseTimer = () => {
    if (isRunning) {
        clearInterval(myInterval);
        isRunning = false;
    }
}

const resetTimer = () => {
    clearInterval(myInterval);
    isRunning = false;
    totalSeconds = originalMinutes * 60;
    updateDisplay();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
