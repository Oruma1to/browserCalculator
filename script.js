// Below i've built the class that houses all of the helper functions of the calculator. Its been broken down into clear, delete, append,operation, compute, get display number, update

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const percentButton = document.querySelector('[data-percent]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const operations = {
  56: '*',
  191: '/',
  187: '+',
  189: '-'
}


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  //Clear makes it so that whenever it the function is called the output is cleared
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  //Delete is simply to slice the very last number off
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  calculatePercentage() {
    this.currentOperand = this.currentOperand * .01
  }

  //Append makes it so that as numbers are dialed in they are concat to the end of the current string.
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return //This line limits the calculator to one period per computation. If a period exists and at any point in time as a decimal placement it will no longer function.
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }


  chooseOperation(operation) {
    if (this.currentOperand === '') return //This line is in place to make sure operators only get returned when the field is not empty. If nothing is in before an operator is chosen, the return will always be empty.
    if (this.previousOperand !== '') {
      this.compute()
    }//This checks to see if the previous operand exists, if it is populated then the compute function will be called and the value will be calculated.
    this.operation = operation //takes in the innerhtml of the operation button chosen
    this.previousOperand = this.currentOperand //previousOperand gets overwritten with current
    this.currentOperand = '' //currentOperand is cleared and awaits new input
  }

  compute() {
    let computation //for switch cases
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return //if not a number then it is returned blank
    switch (this.operation) {//operator function to compute based on case
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case 'x':
        computation = prev * current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

percentButton.addEventListener('click', () => {
  calculator.calculatePercentage();
  calculator.updateDisplay();
})



// Window event listeners for using keyboard
window.addEventListener('keyup', (e) => {
  if (e.key === 'Backspace') {
    calculator.delete();
    calculator.updateDisplay();
  }
  if (e.key === '=') {
    calculator.compute();
    calculator.updateDisplay();
  }

  if (e.key === '%') {
    calculator.calculatePercentage()
    calculator.updateDisplay()
  }

  if (e.key.match(/[*/+-]/)) {
    calculator.chooseOperation(operations[e.keyCode]);
    calculator.updateDisplay()
  }

  if (e.key.match(/[0-9]/)) {
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
  }
})
