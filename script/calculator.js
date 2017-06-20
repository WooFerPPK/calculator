class Calculator {
    constructor(calculatorClass) {
        this._calculatorClass = calculatorClass;
        this.insert = new Insert();
        this.display = new Display(this.calculatorClass);
        this.history = new History();
        this.assignEventListeners(this.calculatorClass);
    }

    get calculatorClass() {
        return this._calculatorClass;
    }

    assignEventListeners(calculatorClass) {
        let combined = [...document.querySelectorAll('.' + calculatorClass + ' .number')].concat([...document.querySelectorAll('.' + calculatorClass + ' .operator')]);
        for (let index = 0; index < combined.length; index++) {
            combined[index].addEventListener('click', (element) => {
                this.inputPressed(element.target.value, element.target.classList.value);
            });
        }
    }

    inputPressed(value, operator) {
        switch(operator) {
            case 'number':
                this.numberPressed(value);
            break;
            case 'operator':
                this.operatorPressed(value);
            break;
        }
    }

    numberPressed(value) {
        this.insert.input += value;

        //Checks to see if 0 is the first character. If so then remove the 0 from the string.
        if (this.insert.input.charAt(0) == 0) {
            this.insert.input = this.insert.input.substring(1, this.insert.input.length);
        }

        this.setOutputDisplay();
    }

    operatorPressed(value) {
        this.history.inputedNumbers = this.insert.input;
        this.insert.resetInput();
        this.history.inputedOperators = value;
        
        if (value == "equal") {
            let calculate = new Calculating(this.history.inputedNumbers, this.history.inputedOperators);
            this.display.output = calculate.answer;
            this.display.showOutput();
        } else {
            this.setOutputDisplay();
        }

    }

    setOutputDisplay() {
        this.display.output = this.insert.input;
        this.display.showOutput();
    }
}

class Calculating {
    constructor(numbers = [], operators = []) {
        this._answer = 0;

        for (var index = 0; index < numbers.length; index++) {
            let current = parseInt(numbers[index]);
            switch(operators[index-1]) {
                case 'add':
                    this._answer += current;
                    break;
                case 'subtract':
                    this._answer -= current;
                    break;
                case 'multiply':
                    this._answer *= current;
                    break;
                default:
                    this._answer = current;
            }
        }
    }

    get answer() {
        return this._answer;
    }
}

class Insert {
    constructor() {
        this._input = 0;
    }

    set input(value) {
        this._input = value;
    }

    get input() {
        return this._input;
    }

    resetInput() {
        this._input = 0;
    }
}

class Display {
    constructor(displayClass) {
        this._displayClass = displayClass;
        this._output = 0;
        this.showOutput();
    }

    get displayClass() {
        return '.' + this._displayClass + ' .display';
    }

    set output(value) {
        this._output = value;
    }
    
    get output() {
        return this._output;
    }

    showOutput() {
        document.querySelectorAll(this.displayClass)[0].innerHTML = this.output;
    }
}

class History {
    constructor() {
        this._inputedNumbers = [];
        this._inputedOperators = [];
    }

    set inputedOperators(operator) {
        this._inputedOperators.push(operator);
    }

    get inputedOperators() {
        return this._inputedOperators;
    }

    set inputedNumbers(input) {
        this._inputedNumbers.push(input);
    }

    get inputedNumbers() {
        return this._inputedNumbers;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    let calculator1 = new Calculator('calculator1');
    let calculator2 = new Calculator('calculator2');
});