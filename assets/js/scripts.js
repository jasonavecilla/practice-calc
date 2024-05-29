const calculator = document.querySelector('.calculator');
// console.log(calculator); 
//get the whole calculator div and assign it to variable calculator.
const keys = calculator.querySelector('.calculator__keys');
// console.log(keys); 
//get the div containing the keys and assign it to variable keys
const display = document.querySelector('.calculator__display');
// console.log(display);
// get the div of display and assign it to variable display

// create an anonymus function with parameter/argument e inside keys variable 
keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        // console.log(key);
        const action = key.dataset.action;
        // console.log(action);
        const keyContent = key.textContent;
        // console.log(keyContent);
        const displayedNum = display.textContent;

        const calculate = (n1, operator, n2) => {
            let result = '';
            
            if (operator === 'add') {
                result = parseFloat(n1) + parseFloat(n2);
            } else if (operator === 'subtract') {
                result = parseFloat(n1) - parseFloat(n2);
            } else if (operator === 'multiply') {
                result = parseFloat(n1) * parseFloat(n2);
            } else if (operator === 'divide') {
                result = parseFloat(n1) / parseFloat(n2);
            }
            
            return result
        }

        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        const previousKeyType = calculator.dataset.previousKeyType;
        console.log(previousKeyType);

        if (!action) {
            if (
            displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ) {
            display.textContent = keyContent;
            } else {
            display.textContent = displayedNum + keyContent;
            }

            calculator.dataset.previousKeyType = 'number';
        }
        
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            
            if (
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add('is-depressed');
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;

            calculator.dataset.previousKeyType = 'operator';
        }
        
        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
            display.textContent = displayedNum + '.';
            } else if (
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ) {
            display.textContent = '0.';
            }
            
        calculator.dataset.previousKeyType = 'decimal';
        }
        
        if (action === 'clear') {
            if (key.textContent === 'AC') {
            calculator.dataset.firstValue = '';
            calculator.dataset.modValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
            } else {
            key.textContent = 'AC';
            }
            
            display.textContent = 0;

            calculator.dataset.previousKeyType = 'clear';
        }
        
        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;
            
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                firstValue = displayedNum;
                secondValue = calculator.dataset.modValue;
                }
                
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            
            // Set modValue attribute
            calculator.dataset.modValue = secondValue;
            
            calculator.dataset.previousKeyType = 'calculate';
        }

    }


});