'use strict';

function select(selector) {
    return document.querySelector(selector);
}

function selectAll(selector) {
    return document.querySelectorAll(selector);
}

function listen(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

const presentTime = select('.current-time');
const hoursInput = select('#hours');
const minutesInput = select('#minutes');
const button = select('#button');

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
}

getTime();

// Attach event listeners to inputs
const inputs = selectAll('.time');
inputs.forEach(function(input) {
    input.addEventListener('input', function() {
        validateInput(input);
    });
});

// Function to validate input
function validateInput(input) {
    input.value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (input.value.length > 2) {
        input.value = input.value.slice(0, 2); // Limit input to 2 characters
    }
}

// Clear input fields
function clearInputs() {
    hoursInput.value = '';
    minutesInput.value = '';
}

// Event listener for page load
window.addEventListener('load', function() {
    clearInputs();
    getTime();
});

// Event listener for button click
button.addEventListener('click', clearInputs);

