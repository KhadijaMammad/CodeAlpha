let currentInput = '0';
let previousInput = '';
let operation = null;
let resetScreen = false;
let calculationHistory = [];

const inputDisplay = document.getElementById('input');
const resultDisplay = document.getElementById('result');
const historyList = document.getElementById('historyList');
const unitConverter = document.getElementById('unitConverter');

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.querySelector('.fa-moon').classList.replace('fa-moon', 'fa-sun');
  }
  
  const savedHistory = localStorage.getItem('calcHistory');
  if (savedHistory) {
    calculationHistory = JSON.parse(savedHistory);
    updateHistoryDisplay();
  }
});

function appendNumber(number) {
  if (currentInput === '0' || resetScreen) {
    currentInput = '';
    resetScreen = false;
  }
  currentInput += number;
  updateDisplay();
}

function appendDot() {
  if (resetScreen) {
    currentInput = '0';
    resetScreen = false;
  }
  if (currentInput === '') {
    currentInput = '0';
  }
  if (!currentInput.includes('.')) {
    currentInput += '.';
  }
  updateDisplay();
}

function appendOperator(op) {
  if (operation !== null && !resetScreen) calculate();
  previousInput = currentInput;
  operation = op;
  resetScreen = true;
  updateDisplay();
}

function calculate() {
  if (operation === null || resetScreen) return;
  
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    case '%':
      result = prev % current;
      break;
    case '^':
      result = Math.pow(prev, current);
      break;
    default:
      return;
  }
  
  addToHistory(`${previousInput} ${operation} ${currentInput}`, result);
  
  currentInput = result.toString();
  operation = null;
  resetScreen = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  previousInput = '';
  operation = null;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function updateDisplay() {
  if (operation !== null) {
    inputDisplay.value = `${previousInput} ${operation} ${currentInput}`;
  } else {
    inputDisplay.value = currentInput;
  }
  resultDisplay.textContent = currentInput;
}

function square() {
  currentInput = (parseFloat(currentInput) ** 2).toString();
  addToHistory(`sqr(${currentInput})`, currentInput);
  updateDisplay();
}

function cube() {
  currentInput = (parseFloat(currentInput) ** 3).toString();
  addToHistory(`cube(${currentInput})`, currentInput);
  updateDisplay();
}

function sqrt() {
  currentInput = Math.sqrt(parseFloat(currentInput)).toString();
  addToHistory(`√(${currentInput})`, currentInput);
  updateDisplay();
}

function cbrt() {
  currentInput = Math.cbrt(parseFloat(currentInput)).toString();
  addToHistory(`∛(${currentInput})`, currentInput);
  updateDisplay();
}

function power() {
  previousInput = currentInput;
  operation = '^';
  resetScreen = true;
  updateDisplay();
}

function factorial() {
  let num = parseInt(currentInput);
  if (num < 0) {
    currentInput = 'Error';
    updateDisplay();
    return;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  currentInput = result.toString();
  addToHistory(`fact(${num})`, result);
  updateDisplay();
}

function sin() {
  currentInput = Math.sin(parseFloat(currentInput)).toString();
  addToHistory(`sin(${currentInput})`, currentInput);
  updateDisplay();
}

function cos() {
  currentInput = Math.cos(parseFloat(currentInput)).toString();
  addToHistory(`cos(${currentInput})`, currentInput);
  updateDisplay();
}

function tan() {
  currentInput = Math.tan(parseFloat(currentInput)).toString();
  addToHistory(`tan(${currentInput})`, currentInput);
  updateDisplay();
}

function log() {
  currentInput = Math.log10(parseFloat(currentInput)).toString();
  addToHistory(`log(${currentInput})`, currentInput);
  updateDisplay();
}

function ln() {
  currentInput = Math.log(parseFloat(currentInput)).toString();
  addToHistory(`ln(${currentInput})`, currentInput);
  updateDisplay();
}

function pi() {
  currentInput = Math.PI.toString();
  updateDisplay();
}

function e() {
  currentInput = Math.E.toString();
  updateDisplay();
}

function addToHistory(expression, result) {
  calculationHistory.push({ expression, result });
  updateHistoryDisplay();
  
  if (calculationHistory.length > 10) {
    calculationHistory.shift();
  }
  
  localStorage.setItem('calcHistory', JSON.stringify(calculationHistory));
}

function updateHistoryDisplay() {
  historyList.innerHTML = '';
  
  calculationHistory.slice().reverse().forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.expression} = ${item.result}`;
    li.onclick = () => {
      currentInput = item.result.toString();
      updateDisplay();
    };
    historyList.appendChild(li);
  });
}

function clearHistory() {
  calculationHistory = [];
  updateHistoryDisplay();
  localStorage.removeItem('calcHistory');
}

function toggleHistory() {
  document.querySelector('.history-panel').classList.toggle('hidden');
}

function toggleScientific() {
  document.querySelector('.scientific').classList.toggle('hidden');
}

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const themeIcon = document.querySelector('.fa-moon, .fa-sun');
  
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
}

function toggleConverter() {
  unitConverter.classList.toggle('hidden');
}

function convertUnit() {
  const inputValue = parseFloat(document.getElementById('unitInput').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  
  if (isNaN(inputValue)) {
    document.getElementById('convertedResult').textContent = 'Keçərli dəyər daxil edin';
    return;
  }


  let meters;
  switch (fromUnit) {
    case 'cm':
      meters = inputValue / 100;
      break;
    case 'km':
      meters = inputValue * 1000;
      break;
    case 'inch':
      meters = inputValue * 0.0254;
      break;
    case 'ft':
      meters = inputValue * 0.3048;
      break;
    default: 
      meters = inputValue;
  }

  let result;
  switch (toUnit) {
    case 'cm':
      result = meters * 100;
      break;
    case 'km':
      result = meters / 1000;
      break;
    case 'inch':
      result = meters / 0.0254;
      break;
    case 'ft':
      result = meters / 0.3048;
      break;
    default: 
      result = meters;
  }

  document.getElementById('convertedResult').textContent = result.toFixed(4);
}

clearDisplay();