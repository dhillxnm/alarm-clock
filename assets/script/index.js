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
const bellDisplay = select('.bell-display');

const alarmAudio = new Audio('./assets/audio/alarm_clock.mp3');
alarmAudio.type = 'audio/mp3';

const theAlarm = new Date();


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

    setTimeout(() =>{
        getTime();
    }, 1000);
}


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


function getUserTime() {
    let hours = hoursInput.value;
    let minutes = minutesInput.value;

    
    if (hours.length == 1){
        hours = '0'+hours;
    }
    
    if (minutes.length == 1){
        minutes = '0'+minutes;
    }

    userTimeSpan.innerText = `${hours}:${minutes}`;
    theAlarm.setHours(hours);
    theAlarm.setMinutes(minutes);

    clearInputs();
}


function compareTime() {
    const currentTime = new Date();
    if ((currentTime.getHours() === theAlarm.getHours()) && (currentTime.getMinutes() === theAlarm.getMinutes())) {
        alarmAudio.play();
        bellDisplay.classList.add('red');
        userTimeSpan.classList.add('show');

        setTimeout(() => { 
            bellDisplay.classList.remove('red'); 
            userTimeSpan.classList.remove('show'); // Remove 'show' class after a certain duration
            userTimeSpan.innerText = '';
        }, 8000);
    } else {
        setTimeout(() => {
            compareTime();
        }, 1000);
    }
}

window.addEventListener('load', function() {
    getTime();
});

button.addEventListener('click', function() {
    getUserTime();
    compareTime();
});