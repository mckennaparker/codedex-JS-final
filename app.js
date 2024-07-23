const waves = new Audio('/public/waves.wav');
const alarm = new Audio('/public/bells.wav');
const startBtn = document.getElementById('btn-start');
const pauseBtn = document.getElementById('btn-pause');
const resetBtn = document.getElementById('btn-reset');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;

const appTimer = () => {
    const sessionAmount = Number.parseInt(session.textContent);

    if (state) {
        state = false;
        let totalSeconds = sessionAmount * 60;

        const updateSeconds = () => {
            const minuteDiv = document.querySelector('.minutes');
            const secondDiv = document.querySelector('.seconds');

            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            if (secondsLeft < 10) {
                secondDiv.textContent = `0${secondsLeft}`;
            } else {
                secondDiv.textContent = `${secondsLeft}`;
            }
            minuteDiv.textContent = `${minutesLeft}`;

            if (totalSeconds > 0) {
                waves.play();
            } else {
                alarm.play();
                clearInterval(myInterval);
                state = true;  // Reset state when timer finishes
            }
        }
        updateSeconds();  // Immediately update the display
        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert('Timer is already running');
    }
}

startBtn.addEventListener('click', appTimer);
