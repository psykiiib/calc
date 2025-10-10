// --- 1. SETUP ---
const screen1 = document.getElementById('upper-dis');
const screen2 = document.getElementById('lower-dis');
const buttons = document.querySelectorAll('button');
const displayContainer = document.getElementById('display-container');
let screenValue = '';

// Initialize display
screen2.value = "0";


// --- 2. CORE LOGIC ---
// Central function to handle all calculator inputs
function handleInput(buttonText) {
    if (buttonText == 'x') {
        buttonText = '*';
        screenValue += buttonText;
        screen1.value = screenValue;
    } else if (buttonText == 'D') {
        screenValue = screenValue.slice(0, -1);
        screen1.value = screenValue;
    } else if (buttonText == 'C') {
        screenValue = "";
        screen1.value = screenValue;
        screen2.value = "0";
    } else if (buttonText == '=') {
        // IMPROVED: Error handling with try...catch
        if (screenValue) {
            try {
                let result = eval(screenValue);
                screen2.value = result;
                screenValue = result.toString(); // Allow using the result in the next calculation
            } catch (error) {
                screen2.value = "Error";
                screenValue = "";
            }
        }
    } else {
        // Prevent multiple operators or leading operators
        if (screenValue === "" && isNaN(buttonText) && buttonText !== '(') return;
        screenValue += buttonText;
        screen1.value = screenValue;
    }
}


// --- 3. EVENT LISTENERS ---

// Listen for button clicks
for (item of buttons) {
    item.addEventListener('click', (e) => {
        // Exclude the theme toggle button from the calculator logic
        if (!e.target.closest('.dark-mode')) {
            handleInput(e.target.innerText);
        }
    });
}

// ADDED: Listen for Keyboard Inputs
window.addEventListener('keydown', (e) => {
    e.preventDefault(); // Prevent default browser actions
    let key = e.key;

    if (key >= '0' && key <= '9' || key === '.' || key === '(' || key === ')') {
        handleInput(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        handleInput(key);
    } else if (key === 'Enter' || key === '=') {
        handleInput('=');
    } else if (key === 'Backspace') {
        handleInput('D');
    } else if (key.toLowerCase() === 'c' || key === 'Escape') {
        handleInput('C');
    }
});


// --- 4. THEME TOGGLE ---
// FIXED: Two-way dark/light mode toggle
function cngMode() {
    displayContainer.classList.toggle('dark');
    displayContainer.classList.toggle('light');
}