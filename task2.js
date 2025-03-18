let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let laps = [];

const display = document.querySelector('.display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

function updateDisplay() {
    const time = elapsedTime + (running ? Date.now() - startTime : 0);
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);

    display.textContent = 
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}:` +
        `${String(milliseconds).padStart(2, '0')}`;
}

function startPause() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.style.background = 'orange';
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.style.background = 'green';
    }
    running = !running;
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = 'Start';
    startPauseBtn.style.background = 'green';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    laps = [];
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (!running) return;
    let lapTime = display.textContent;
    laps.push(lapTime);
    let li = document.createElement('li');
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsContainer.appendChild(li);
}

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
