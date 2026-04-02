const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const buttons = document.querySelectorAll('.btn');

let currentExpression = '';
let isError = false;

// Converting UI symbols (like ×) into actual math operators (like *) so the backend understands them
const symbolMap = {
    '÷': '/',
    '×': '*',
    '−': '-'
};

function updateDisplay() {
    display.textContent = currentExpression || '0';
    // Auto-scroll the display to the right when a user types a very long equation
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
            // Swap out pretty symbols for actual code symbols
            if (symbolMap[val]) val = symbolMap[val];
            currentExpression += val;
            updateDisplay();
        } else if (action === 'clear') {
            currentExpression = '';
            historyDisplay.textContent = '';
            updateDisplay();
        } else if (action === 'delete') {
            // Instead of deleting letter by letter, let's delete whole functions like "sin(" together at once!
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

    // Making the buttons feel squishy and real when clicked (like a physical calculator)
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
    
    // Push the old equation upstairs to the history bar so the user can see what they just calculated
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
            // Fixing that annoying computer math glitch where 0.1 + 0.2 equals 0.30000000004
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

// Letting the user type directly with their keyboard so they don't have to click the fancy UI buttons!
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
