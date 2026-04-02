const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentExpression = '';
let isError = false;

// Map visual operators to script safe ones
const symbolMap = {
    '÷': '/',
    '×': '*',
    '−': '-'
};

function updateDisplay() {
    display.textContent = currentExpression || '0';
    // auto scroll to end
    display.scrollLeft = display.scrollWidth;
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isError) {
            currentExpression = '';
            isError = false;
            historyDisplay.textContent = '';
        }

        const action = btn.dataset.action;
        let val = btn.dataset.val;

        if (val) {
            // translate visual to compute
            if (symbolMap[val]) val = symbolMap[val];
            currentExpression += val;
            updateDisplay();
        } else if (action === 'clear') {
            currentExpression = '';
            historyDisplay.textContent = '';
            updateDisplay();
        } else if (action === 'delete') {
            // smart delete for functions
            if (currentExpression.endsWith('sin(') || currentExpression.endsWith('cos(') || currentExpression.endsWith('tan(') || currentExpression.endsWith('log(')) {
                currentExpression = currentExpression.slice(0, -4);
            } else if (currentExpression.endsWith('sqrt(')) {
                currentExpression = currentExpression.slice(0, -5);
            } else if (currentExpression.endsWith('ln(')) {
                currentExpression = currentExpression.slice(0, -3);
            } else if (currentExpression.endsWith('pi')) {
                currentExpression = currentExpression.slice(0, -2);
            } else if (currentExpression.length > 0) {
                currentExpression = currentExpression.slice(0, -1);
            }
            updateDisplay();
        } else if (action === 'equals') {
            evaluateExpression();
        }
    });

    // Handle button aesthetic feedback
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'scale(0.92)';
    });
    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

async function evaluateExpression() {
    if (!currentExpression) return;
    
    // Save history visually
    historyDisplay.textContent = currentExpression + ' =';
    display.textContent = '...';

    try {
        const response = await fetch('index.php?calculate=1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expression: currentExpression })
        });
        
        const data = await response.json();
        
        if (data.error) {
            display.textContent = data.error;
            isError = true;
        } else {
            // Check for floating point precision issues by rounding to 8 decimals
            let result = Number(Math.round(data.result + 'e8') + 'e-8');
            currentExpression = result.toString();
            updateDisplay();
        }
    } catch (err) {
        display.textContent = "Network Error";
        console.error(err);
        isError = true;
    }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (/[0-9\+\-\*\/\.\(\)\^%]/.test(key)) {
        e.preventDefault();
        currentExpression += key;
        updateDisplay();
    } else if (key === 'Enter') {
        e.preventDefault();
        evaluateExpression();
    } else if (key === 'Backspace') {
        e.preventDefault();
        currentExpression = currentExpression.slice(0, -1);
        updateDisplay();
    } else if (key === 'Escape') {
        e.preventDefault();
        currentExpression = '';
        historyDisplay.textContent = '';
        updateDisplay();
    }
});
