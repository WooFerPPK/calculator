export default class Display {
    constructor(displayClass, history) {
        this._displayClass = displayClass;
        this._history = history;
        this._output = '';
        this.currentInput = '';
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

    set currentInput(value) {
        this._currentInput = value;
    }

    get currentInput() {
        return this._currentInput;
    }

    get currentExpression() {
        let expression = '';
        this._history.inputedNumbers.forEach((number, index) => {
            let symbol;
            let showinputedNumber = true;

            switch (this._history.inputedOperators[index]) {
                case 'add':
                    symbol = "+"
                    break;
                case 'equal':
                    symbol = "=";
                    showinputedNumber = false;
                    break;
                default:
                    symbol = this._history.inputedOperators[index];
            }
            expression += (showinputedNumber) ? `${(number) ? number : ''} ${symbol} ` : '';
        });
        expression += this._currentInput;
        return expression.trim();
    }

    reset() {
        this._output = '';
        this._currentInput = '';
    }

    showOutput() {
        document.querySelector(this.displayClass).innerHTML = this.output;
    }
}