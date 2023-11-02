const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.querySelector('.timerDisplay');
const consoleElement = document.getElementById("console");

let timer;
let totalTime = 900000; // 15 minutes in milliseconds
let currentTime = totalTime;

function startRoutine() {
    doExercise(1);
    timer = setInterval(updateTimer, 1000);
}

function displayConsoleMessage(message) {
    const emojis = ["💪", "🏋️‍♂️", "🏋️‍♀️", "🤸‍♂️", "🤸‍♀️"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const gymElement = document.createElement('div');
    gymElement.innerHTML = `<span>${randomEmoji} ${message}</span>`;
    consoleElement.innerHTML = '';
    consoleElement.appendChild(gymElement);
}

function pauseRoutine() {
    clearInterval(timer);
    displayConsoleMessage("Workout paused.");
}

function updateTimer() {
    if (currentTime <= 0) {
        clearInterval(timer);
        displayConsoleMessage("Workout completed.");
        return;
    }

    currentTime -= 1000;
    updateTimerDisplay();
}

function doExercise(exerciseNumber) {
    if (exerciseNumber <= 4) {
        const confirmed = window.confirm(`Start Exercise ${exerciseNumber}. Do you want to continue?`);
        if (!confirmed) {
            displayConsoleMessage("Workout interrupted.");
            return;
        }

        displayConsoleMessage(`Continue Exercise ${exerciseNumber}`);
        // Add code for exercise here

        setTimeout(function() {
            doRest(exerciseNumber);
        }, 25000); // 25 seconds for exercise
    }
}

function doRest(exerciseNumber) {
    if (exerciseNumber <= 4) {
        const confirmed = window.confirm(`Start Rest ${exerciseNumber}. Do you want to continue?`);
        if (!confirmed) {
            displayConsoleMessage("Workout interrupted.");
            return;
        }

        displayConsoleMessage(`Continue Rest ${exerciseNumber}`);
        // Add code for rest here

        setTimeout(function() {
            displayConsoleMessage(`Rest ${exerciseNumber} completed.`);
            doExercise(exerciseNumber + 1);
        }, 25000); // 25 seconds for rest
    }
}

function resetRoutine() {
    clearInterval(timer);
    displayConsoleMessage("Workout reset.");
    currentTime = totalTime;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', startRoutine);
pauseButton.addEventListener('click', pauseRoutine);
resetButton.addEventListener('click', resetRoutine);
