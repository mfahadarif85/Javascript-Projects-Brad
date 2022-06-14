const balanceEl = document.getElementById("balance");
const moneyPlusEl = document.getElementById("money-plus");
const moneyMinusEl = document.getElementById("money-minus");
const listEl = document.getElementById("list");
const formEl = document.getElementById("form");
const textEl = document.getElementById("text");
const amountEl = document.getElementById("amount");

const dummyTransactions = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 1, text: "Flower", amount: 150 },
];

let transactions = dummyTransactions;

// add transactions to DOM list

function addTransactionDom(transaction) {
  // get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn">x</button>
  `;
  listEl.appendChild(item);
}

// initialize app
function init() {
  listEl.innerHTML = "";
  transactions.forEach(addTransactionDom);
}
init();
