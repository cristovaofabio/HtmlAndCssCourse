// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2022-12-03T07:42:02.383Z",
    "2022-12-14T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2012-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function formatDate(date) {
  const day = (date.getDate() + "").padStart(2, 0);
  const month = (date.getMonth() + 1 + "").padStart(2, 0);
  const year = date.getFullYear();
  // const hour = (date.getHours() + "").padStart(2, 0);
  // const min = (date.getMinutes() + "").padStart(2, 0);

  return `${day}/${month}/${year}`;
}

function calcDaysPassed(date1, date2) {
  const days = Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  if (days === 0) {
    return "today";
  } else if (days === 1) {
    return "yesterday";
  }

  return `${days} days ago`;
}

const displayMovements = function (account) {
  containerMovements.innerHTML = "";
  account.movements.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatDate(date);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}"> 
      ${i + 1} ${type} </div>
      <div class="movements__date">${displayDate} - ${calcDaysPassed(
      new Date(),
      date
    )}</div>
      <div class="movements__value">${mov}</div>
    </div>
  `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (account) {
  const sum = account.movements.reduce((acc, value) => {
    return acc + value;
  }, 0);

  account.balance = sum;

  labelBalance.textContent = account.balance + "€";
};

const createUsernames = function (accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

let currentAccount;

function updateUI(acc) {
  displayMovements(acc);
  displayBalance(acc);
}

function searchAccount(username, password) {
  return accounts.find((acc) => {
    return acc.username === username && acc.pin === password;
  });
}

//FAKE LOGIN:
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 1;

//GET DATE:
const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
};
const locale = navigator.language;
// const day = (now.getDate() + "").padStart(2, 0);
// const month = (now.getMonth() + 1 + "").padStart(2, 0);
// const year = now.getFullYear();
// const hour = (now.getHours() + "").padStart(2, 0);
// const min = (now.getMinutes() + "").padStart(2, 0);

// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

btnLogin.addEventListener("click", (e) => {
  e.preventDefault(); //no update the page

  currentAccount = searchAccount(
    inputLoginUsername.value,
    Number(inputLoginPin.value)
  );

  if (currentAccount) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner}!`;

    updateUI(currentAccount);

    containerApp.style.opacity = 1;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  } else {
    console.log("Oh, no! Something wrong happened!");
  }
});

btnTransfer.addEventListener("click", (e) => {
  e.preventDefault(); //no update the page
  const amount = Number(inputTransferAmount.value);
  const transferTo = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    transferTo &&
    amount > 0 &&
    amount <= currentAccount.balance &&
    transferTo?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    transferTo.movements.push(amount);
    transferTo.movementsDates.push(new Date());
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);

    inputTransferAmount.value = inputTransferTo.value = "";
    inputTransferAmount.blur();
    inputTransferTo.blur();
  } else {
    console.log("Transfer not allowed");
  }
});

btnClose.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) =>
        acc.username === currentAccount.username &&
        acc.pin === currentAccount.pin
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = `Log in to get started`;
  } else {
  }
});

btnLoan.addEventListener("click", (e) => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date());
    updateUI(currentAccount);
  }

  inputLoanAmount.value = "";
});

btnSort.addEventListener("click", () => {
  currentAccount.movements.sort((a, b) => a - b);
  updateUI(currentAccount);
});

////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
