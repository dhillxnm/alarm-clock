'use strict';

// Utility functions

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// DOM

const presentTime = select('.current-time');
const hoursInput = select('#hours');
const minutesInput = select('#minutes');
const button = select('#button');
const userTimeSpan = select('.user-time');


// Show current time
function getTime() {
    const now = new Date();
    const hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    const currentTime = `${hours}:${minutes}`;
    presentTime.innerText = currentTime;
    return { hours, minutes };
}
getTime();


// Attach event listeners to inputs
const inputs = selectAll('.time');
inputs.forEach(function(input) {
    input.addEventListener('input', function() {
        validateInput(input);
        updateUserTime(); // Update user-set time display when inputs change
    });
});


// validation of inputs
function validateInput(input) {
    input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2);
    }
    
    if (input === hoursInput) {
        const hours = parseInt(input.value) || 0;
        if (hours < 0) {
            input.value = '00';
        } else if (hours > 23) {
            input.value = '23';
        }
    }
    
    if (input === minutesInput) {
        const minutes = parseInt(input.value) || 0;
        if (minutes < 0) {
            input.value = '00';
        } else if (minutes > 59) {
            input.value = '59';
        }
    }
}


function clearInputs() {
    hoursInput.value = '';
    minutesInput.value = '';
}

window.addEventListener('load', function() {
    clearInputs();
    getTime();
});


button.addEventListener('click', function() {
    clearInputs();
    compareTime()
});


function getUserTime() {
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    return { hours, minutes };
}

function updateUserTime() {
    const userTime = getUserTime();
    userTimeSpan.innerText = `${userTime.hours} : ${userTime.minutes}`;
}
updateUserTime();


// Function to compare current time with user-set time
function compareTime() {
    const currentTime = getTime(); 
    const userTime = getUserTime(); 
    if (currentTime.hours === userTime.hours && currentTime.minutes === userTime.minutes) {
        // Play audio
        const alarmAudio = new Audio('./assets/audio/alarm_clock sound.mp3'); // Define audio
        alarmAudio.play(); 
    }
}

compareTime();
setInterval(compareTime, 1000); 



