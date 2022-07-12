"use strict";
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all-clear');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement, currentOperand, previousOperand) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = currentOperand;
        this.previousOperand = previousOperand;
    }
    formatDisplayNumber(num) {
        const stringNumber = String(num);
        const intergerDigites = parseFloat(stringNumber.split('.')[0]);
        const decimalDigites = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(intergerDigites)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = intergerDigites.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigites != null) {
            return `${integerDisplay}.${decimalDigites}`;
        }
        else {
            return integerDisplay;
        }
    }
    appendNumber(num) {
        if (this.currentOperand.includes('.') && String(num) === '.')
            return;
        this.currentOperand += num.toString();
    }
    calculate() {
        let result;
        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);
        if (isNaN(_previousOperand) || isNaN(_currentOperand))
            return;
        switch (this.operation) {
            case '+':
                result = +_previousOperand + +_currentOperand;
                break;
            case '-':
                result = +_previousOperand - +_currentOperand;
                break;
            case '/':
                result = +_previousOperand / +_currentOperand;
                break;
            case '*':
                result = +_previousOperand * +_currentOperand;
                break;
            default:
                return;
        }
        this.currentOperand = String(result);
        this.operation = undefined;
        this.previousOperand = '';
    }
    chooseOperation(operation) {
        if (!this.currentOperand)
            return;
        if (this.previousOperand) {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    delete() {
        this.currentOperand = this.currentOperand.slice(0, -1);
        if (!this.currentOperand)
            this.currentOperand = `0`;
    }
    clear() {
        this.currentOperand = ''; // limpa o número de cima
        this.previousOperand = ''; // limpa o número de baixo
        this.operation = undefined; // limpa a operação
    }
    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, '', '');
for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}
for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});
equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});
deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});
