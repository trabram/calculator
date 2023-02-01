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
const elemBtnClearAll   = document.querySelector('#btnClearAll');
const elemBtnClear      = document.querySelector('#btnClear');
const elemBtnNegative   = document.querySelector('#btnNegative');

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
    } else if (input !== '.') {
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
      query.symbol = '−';
      break;
    case 'multiply':
      query.symbol = '×';
      break;
    case 'divide':
      query.symbol = '÷';
      break;
  }
}
function updateDisplayTop() {
  elemDisplayTop.textContent = `${query.num1} ${query.symbol} ${query.num2}`;
}
function reset() {
  // empty query
  for (const key in query) {
    query[key] = '';
  }
  // empty display
  elemDisplayTop.textContent = ''
  elemDisplayResult.textContent = ''
}

// onclick events
elemBtnNumbers.forEach(element => {
  const number = element.dataset.num;
  
  element.onclick = () => {
    // reset when finish (result calculated)
    if (query.num1     !== '' &&
        query.num2     !== '' &&
        query.operator !== '' &&
        query.result   !== ''
    ) reset();
    
    setNumber(number);
    updateDisplayTop();
  };
});
elemBtnOperators.forEach(element => {
  const operation = element.dataset.opr;
  
  element.onclick = () => {

    // disable if no number given
    if (query.num1 === '') return;

    // show result function
    if ( operation  === 'result' && 
         query.num1 !== ''       && 
         query.num2 !== ''
    ) {
      query.result = window[query.operator](+query.num1, +query.num2);
      elemDisplayResult.textContent = query.result;
      return;
    }

    // set result if input on num2 already exist (chaining)
    if (query.num2 !== '') {
      query.result = window[query.operator](+query.num1, +query.num2);
    }

    // result chaining
    if (query.result !== '') {
      query.num1   = query.result;
      query.num2   = '';
      query.result = '';
      elemDisplayResult.textContent = '';
    }

    // set operator and display query
    setOperator(element.dataset.opr);
    updateDisplayTop();
  };
});
elemBtnClearAll.onclick = () => {
  reset()
};
elemBtnClear.onclick = () => {
  if (query.operator) query.num2 = '';
  else                query.num1 = '';
  
  updateDisplayTop();
  query.result = '';
  elemDisplayResult.textContent = '';
};
elemBtnNegative.onclick = () => {
  let number      = query.operator ? query.num2 : query.num1;

  if (number != 0) {
    if (number.includes('-')) number = number.slice(1);
    else                      number = '-' + number;
  }

  if (query.operator) query.num2 = number;
  else                query.num1 = number;
  updateDisplayTop();
};