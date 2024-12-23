// script.js

// Seleciona elementos importantes
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

// Variáveis para armazenar o estado da calculadora
let currentInput = ""; // Entrada atual (número ou operador)
let firstOperand = null; // Primeiro número
let secondOperand = null; // Segundo número
let operator = null; // Operador matemático atual
let shouldResetDisplay = false; // Flag para resetar o display ao começar novo número

// Função para atualizar o display
function updateDisplay(value) {
  if (shouldResetDisplay) {
    display.textContent = value;
    shouldResetDisplay = false;
  } else {
    display.textContent =
      display.textContent === "0" ? value : display.textContent + value;
  }
}

// Função para limpar tudo
function clearCalculator() {
  currentInput = "";
  firstOperand = null;
  secondOperand = null;
  operator = null;
  shouldResetDisplay = false;
  display.textContent = "0";
}

// Função para executar a operação
function calculate() {
  if (operator === null || firstOperand === null) return;

  secondOperand = parseFloat(currentInput);
  let result = 0;

  switch (operator) {
    case "+":
      result = firstOperand + secondOperand;
      break;
    case "-":
      result = firstOperand - secondOperand;
      break;
    case "*":
      result = firstOperand * secondOperand;
      break;
    case "/":
      if (secondOperand === 0) {
        alert("Erro: Divisão por zero!");
        clearCalculator();
        return;
      }
      result = firstOperand / secondOperand;
      break;
    default:
      return;
  }

  display.textContent = result;
  firstOperand = result;
  currentInput = "";
  operator = null;
  shouldResetDisplay = true;
}

// Adiciona eventos aos botões
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    // Se o botão for "C" (limpar)
    if (button.id === "clear") {
      clearCalculator();
      return;
    }

    // Se o botão for "=" (igual)
    if (button.id === "equals") {
      calculate();
      return;
    }

    // Se o botão for um operador
    if (button.classList.contains("operator")) {
      if (operator !== null && currentInput !== "") {
        calculate(); // Calcula a operação atual antes de definir um novo operador
      }
      operator = value;
      firstOperand = parseFloat(display.textContent);
      currentInput = "";
      shouldResetDisplay = true;
      return;
    }

    // Se o botão for um número ou "."
    if (value === "." && display.textContent.includes(".")) {
      return; // Impede múltiplos pontos decimais
    }

    currentInput += value;
    updateDisplay(value);
  });
});
