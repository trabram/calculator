// math functions
function add(a,b)      { return a + b }
function subtract(a,b) { return a - b }
function multiply(a,b) { return a * b }
function divide(a,b)   { return a / b }
function modulo(a,b)   { return a % b }
function operate(operator, a, b) { return operator(a, b) }

// elements
const elemDisplayTop = document.querySelector('.display__top')
const elemBtnNumbers = document.querySelectorAll('.btn__num');

// variables
const query = {
  num1     : '',
  num2     : '',
  operator : ''
};

// input functions
function setNumber(number) {
  let value = query.operator ? query.num2 : query.num1;

  // init 0 logic
  if (value == 0) {
    if (number == 0) {
      value = 0;
    } else {
      value = number;
    } 
  } else {
    value += number;
  }

  if (query.operator) query.num2 = value;
  else                query.num1 = value;
}

elemBtnNumbers.forEach(element => {
  const number = element.dataset.num;
  
  element.onclick = () => {
    setNumber(number);
    elemDisplayTop.textContent = query.num1;
  };

});