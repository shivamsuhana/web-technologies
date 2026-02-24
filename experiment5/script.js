const display = document.getElementById('display');

// Append numbers or operators to the screen
function appendToDisplay(input) {
    display.value += input;
}

// Clear the entire screen
function clearDisplay() {
    display.value = "";
}

// Delete the last character (Backspace)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Perform the calculation
function calculate() {
    try {
        // eval() takes the string (e.g., "2+2") and does the math
        display.value = eval(display.value);
    } catch (error) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500); // Reset after 1.5s if error occurs
    }
}