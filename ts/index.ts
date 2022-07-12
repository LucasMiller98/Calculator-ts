const numberButtons = document.querySelectorAll('[data-number]') as any
const operationButtons = document.querySelectorAll('[data-operator]') as any
const equalsButton = document.querySelector('.equals') as HTMLButtonElement
const deleteButton = document.querySelector('.delete') as HTMLButtonElement
const allClearButton = document.querySelector('.all-clear') as HTMLButtonElement
const previousOperandTextElement = document.querySelector('.previous-operand') as HTMLButtonElement
const currentOperandTextElement = document.querySelector('.current-operand') as HTMLButtonElement

class Calculator {
  public previousOperandTextElement
  public currentOperandTextElement
  public currentOperand: string | any
  public previousOperand: string | any
  public operation: unknown
  
  constructor(previousOperandTextElement: HTMLButtonElement, currentOperandTextElement: HTMLButtonElement, currentOperand: string, previousOperand: string) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.currentOperand = currentOperand
    this.previousOperand = previousOperand
  }

  public formatDisplayNumber(num: number) {
    const stringNumber = String(num)

    const intergerDigites = parseFloat(stringNumber.split('.')[0])
    const decimalDigites = stringNumber.split('.')[1]

    let integerDisplay: string

    if(isNaN(intergerDigites)) {
      integerDisplay = ''
    }else{
      integerDisplay = intergerDigites.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if(decimalDigites != null) {
      return `${integerDisplay}.${decimalDigites}`
    }else{
      return integerDisplay
    }
  }

  public appendNumber(num: number) {
    if(this.currentOperand.includes('.') && String(num) === '.') return

    this.currentOperand += num.toString()
  }
  
  public calculate() {
    let result: number

    const _previousOperand = parseFloat(this.previousOperand)
    const _currentOperand = parseFloat(this.currentOperand) 
 
    if(isNaN(_previousOperand) || isNaN(_currentOperand)) return

    switch(this.operation) {
      case '+':
        result = +_previousOperand + +_currentOperand
      break

      case '-':
        result = +_previousOperand - +_currentOperand
      break

      case '/':
        result = +_previousOperand / +_currentOperand
      break

      case '*':
        result = +_previousOperand * +_currentOperand
      break

      default:
        return
    }

    this.currentOperand = String(result)
    this.operation = undefined
    this.previousOperand = ''
  }

  public chooseOperation(operation: unknown) {
    
    if(!this.currentOperand) return 
    
    if(this.previousOperand) {
      this.calculate()
    }

    this.operation = operation

    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  public delete() {
    this.currentOperand = this.currentOperand.slice(0, -1)

    if(!this.currentOperand) this.currentOperand = `0` 
  }

  public clear() {
    this.currentOperand = '' // limpa o número de cima
    this.previousOperand = '' // limpa o número de baixo
    this.operation = undefined // limpa a operação
  }

  public updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand)
  }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, '', '')

for(const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.innerText)
    calculator.updateDisplay()
  })
}

for(const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.innerText)
    calculator.updateDisplay()
  })
}

allClearButton.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
  calculator.calculate()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})