// math functions
function add(a,b)      { return a + b }
function subtract(a,b) { return a - b }
function multiply(a,b) { return a * b }
function divide(a,b)   { return a / b }

// elements
const elemDisplayTop    = document.querySelector('.display__top')
const elemDisplayResult = document.querySelector('.display__result')
const elemBtnNumbers    = document.querySelectorAll('.btn__num');
const elemBtnOperators  = document.querySelectorAll('.btn__opr');
const elemBtnClear      = document.querySelector('#btnClear');

// variables
const query = {
  num1     : '',
  num2     : '',
  operator : '',
  symbol   : '',
  result   : ''
};

// functions
function setNumber(input) {
  let number      = query.operator ? query.num2 : query.num1;
  let specialCase = false;

  // decimal logic
  if (input === '.') {
    if (number === '') {
      number = '0.';
      specialCase = true;
    } 
    if (number.includes('.')) {
      specialCase = true;
    }
  }

  // zero logic
  if (number === '0') {
    if (input === '0') {
      specialCase = true;
    } else {
      number = input;
      specialCase = true;
    }
  }

  if (!specialCase) number += input;

  if (query.operator) query.num2 = number;
  else                query.num1 = number;
}
function setOperator(opr) {
  query.operator = opr;

  switch (opr) {
    case 'add':
      query.symbol = '+';
      break;
    case 'subtract':
      query.symbol = '-';
      break;
    case 'multiply':
      query.symbol = '*';
      break;
    case 'divide':
      query.symbol = '/';
      break;
  }
}

// onclick events
elemBtnNumbers.forEach(element => {
  const number = element.dataset.num;
  
  element.onclick = () => {
    setNumber(number);
    elemDisplayTop.textContent = `${query.num1} ${query.symbol} ${query.num2}`;
  };
});
elemBtnOperators.forEach(element => {
  const operation = element.dataset.opr;
  
  element.onclick = () => {

    // disable if no number given
    if (query.num1 === '') return;

    // show result
    if ( operation  === 'result' && 
         query.num1 !== ''       && 
         query.num2 !== ''
    ) {
      query.result = window[query.operator](+query.num1, +query.num2);
      elemDisplayResult.textContent = query.result;
      return;
    }

    // set result if input on num2 already exist (part of chaining)
    if (query.num2 !== '') {
      query.result = window[query.operator](+query.num1, +query.num2);
    }

    // result chaining
    if (query.result !== '') {
      query.num1 = query.result;
      query.num2 = '';
      elemDisplayResult.textContent = query.result;
    }

    // set operator
    let symbol = setOperator(element.dataset.opr);
    elemDisplayTop.textContent = `${query.num1} ${query.symbol} ${query.num2}`;
  };
});
elemBtnClear.onclick = () => {
  // empty query
  for (const key in query) {
    query[key] = '';
  }
  // empty display
  elemDisplayTop.textContent = ''
  elemDisplayResult.textContent = ''
};