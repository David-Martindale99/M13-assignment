// DOM HELMPER FUNCTION
const $ = (id) => document.getElementById(id)

// GLOBAL VARIABLES
let ownerName
let depositAmount
let withdrawalAmount
let account

// FORMATTING HELPER FUNCTION
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// NAME BTN EVENT LISTENER
$('name').addEventListener('click', () => {
    ownerName = prompt('Enter name of account holder.')
    // Load existing balance from localStorage or start a new account with 0 balance
    let storedBalance = parseFloat(localStorage.getItem(ownerName))
    let initialBalance = isNaN(storedBalance) ? 0 : storedBalance
    // create a new bank account for the owner
    account = bankAccount(ownerName, initialBalance)
    // Display the initial balance for this account
    $('current-balance').innerHTML = `$${formatMoney(initialBalance)}`
    $('balance-title').innerHTML = `${ownerName}'s Current Balance:`
})

// DEPOSIT BTN EVENT LISTENER
$('deposit').addEventListener('click', () => {
   depositAmount = parseFloat(prompt('Enter amount for deposit.'))
   // make a deposit to the account
   if (account) {
       account.deposit(depositAmount)
   } else {
       alert('You must first set a name for the account holder.')
   }
})

// WITHDRAW BTN EVENT LISTENER
$('withdraw').addEventListener('click', () => {
    withdrawalAmount = parseFloat(prompt('Enter amount to be withdrawn.'))
    // make a withdrawal from the account
    if (account) {
        account.withdrawal(withdrawalAmount)
    } else {
        alert('You must first set a name for the account holder.')
    }
})

// BANK ACCOUNT CLOSURE FUNCTION
function bankAccount(ownerName, initialBalance) {
    let balance = initialBalance
    let owner = ownerName

    return {
        withdrawal: function(withdrawalAmount) {
            if (withdrawalAmount <= 0) {
                console.log("Withdrawal amount must be greater than 0")
                return
            }
            if (withdrawalAmount > balance) {
                console.log("Insufficient balance for withdrawal")
                return
            }
            balance -= withdrawalAmount
            $('current-balance').innerHTML = `$${formatMoney(balance)}`
            // Store updated balance in localStorage
            localStorage.setItem(owner, balance)
        },

        deposit: function(depositAmount) {
            if (depositAmount <= 0) {
                console.log("Deposit amount must be greater than 0")
                return
            }
            balance += depositAmount
            $('current-balance').innerHTML = `$${formatMoney(balance)}`
            // Store updated balance in localStorage
            localStorage.setItem(owner, balance)
        },

        getBalance: function() {
            return balance
        },

        getOwnerName: function() {
            return owner
        }
    }
}