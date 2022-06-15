const balanceEl = document.getElementById("balance");
const moneyPlusEl = document.getElementById("money-plus");
const moneyMinusEl = document.getElementById("money-minus");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const amountEl = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Profit", amount: 150 },
// ];

// get local storage transactions and save to transactions array
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

//function to update local storage transactions
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// function to add new transaction to history list
function addTransaction(e) {
  //prevent submission of form with page refresh
  e.preventDefault();
  //alert if no values are input
  if (text.value.trim() === "" || amountEl.value.trim() === "") {
    alert("Please add a text and amount");
  }
  // update inputs in transactionss
  else {
    const transaction = {
      id: generateID(),
      text: textEl.value,
      amount: +amountEl.value,
    };
    transactions.push(transaction);
    addTransactionDom(transaction);
    updateValues();
    updateLocalStorage();
    textEl.value = "";
    amountEl.value = "";
  }
}

// function to generate random ID
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

// function to add transactions to DOM list
function addTransactionDom(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;
  listEl.appendChild(item);
}

// function to remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init();
}

// function to update the balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts
      .filter((item) => item < 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2) * -1;

  balanceEl.innerText = `$${total}`;
  moneyPlusEl.innerText = `$${income}`;
  moneyMinusEl.innerText = `$${expense}`;
}

// function to initialize app
function init() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionDom);
  updateValues();
}

init();

// event listener
formEl.addEventListener("submit", addTransaction);
