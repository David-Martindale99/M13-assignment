// DOM HELPER FUNCTION
const $ = (id) => document.getElementById(id)

// GLOBAL VARIABLES
let ownerName
let depositAmount
let withdrawalAmount
let account

// FORMATTING HELPER FUNCTION
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
}

// NAME BTN EVENT LISTENER
$("name").addEventListener("click", () => {
  ownerName = prompt("Enter name of account holder.").trim().toUpperCase()
  // Load existing balance from localStorage or start a new account with 0 balance
  let storedBalance = parseFloat(localStorage.getItem(ownerName))
  let initialBalance = isNaN(storedBalance) ? 0 : storedBalance
  // create a new bank account for the owner
  account = bankAccount(ownerName, initialBalance)
  // Display the initial balance for this account
  $("current-balance").innerHTML = `$${formatMoney(initialBalance)}`
  $("balance-title").innerHTML = `${ownerName}'s Current Balance:`
})

// DEPOSIT BTN EVENT LISTENER
$('deposit').addEventListener('click', function() {
    depositAmount = parseFloat(prompt('Enter amount for deposit.'))

    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert('Invalid deposit amount')
        return
    }

    if (!account) {
        alert('You must first set a name for the account holder.')
        return
    }

    account.deposit(depositAmount)

    const confettiSettings = {
        particleCount: 100,
        spread: 70,
        colors: [
          "#FFD700",
          "#FFA500",
          "#FFC0CB",
          "#00FF00",
          "#00FFFF",
          "#FF00FF",
          "#FF0000",
        ],
      }
    
      const confettiCanvas = $("confetti-canvas")
    
      confetti.create(confettiCanvas, confettiSettings)
      confetti({
        particleCount: 100,
        spread: 70,
        colors: [
          "#FFD700",
          "#FFA500",
          "#FFC0CB",
          "#00FF00",
          "#00FFFF",
          "#FF00FF",
          "#FF0000",
        ],
      })
    
      setTimeout(function () {
        confetti.reset()
      }, 2000) // 2000 milliseconds = 2 seconds

     // Add animation class to balance element
    $("current-balance").classList.add("balance-animation")

    setTimeout(function () {
        // Remove animation class after a delay
        $("current-balance").classList.remove("balance-animation")
    }, 1000) // 1000 milliseconds = 1 second 
})


// WITHDRAWAL BTN EVENT LISTENER
$("withdrawal").addEventListener("click", () => {
  withdrawalAmount = parseFloat(prompt("Enter amount to be withdrawn."))
  // make a withdrawal from the account
  if (account) {
    account.withdrawal(withdrawalAmount)
  } else {
    alert("You must first set a name for the account holder.")
  }
  // Add animation class to balance element
  $("current-balance").classList.add("balance-animation")

  setTimeout(function () {
    // Remove animation class after a delay
    $("current-balance").classList.remove("balance-animation")
  }, 1000) // 1000 milliseconds = 1 second
})

// BANK ACCOUNT CLOSURE FUNCTION
function bankAccount(ownerName, initialBalance) {
  let balance = initialBalance
  let owner = ownerName

  return {
    withdrawal: function (withdrawalAmount) {
      if (withdrawalAmount <= 0) {
        console.log("Withdrawal amount must be greater than 0")
        return
      }
      if (withdrawalAmount > balance) {
        console.log("Insufficient balance for withdrawal")
        return
      }
      balance -= withdrawalAmount
      updateBalanceDisplay(balance)
      // Store updated balance in localStorage
      localStorage.setItem(owner, balance)
    },

    deposit: function (depositAmount) {
      if (depositAmount <= 0) {
        console.log("Deposit amount must be greater than 0")
        return
      }
      balance += depositAmount
      updateBalanceDisplay(balance)
      // Store updated balance in localStorage
      localStorage.setItem(owner, balance)
    },

    getBalance: function () {
      return balance
    },

    getOwnerName: function () {
      return owner
    },
  }
} 

// Update Balance Function
function updateBalanceDisplay(balance) {
    // Update the balance display
    $("current-balance").innerHTML = `$${formatMoney(balance)}`

    // Check for achievements
    if (balance >= 1000000000) {
        alert("Congratulations! You're a Billionaire!")
    } else if (balance >= 1000000) {
        alert("Congratulations! You're a Millionaire!")
    } else if (balance >= 1000) {
        alert("Congratulations! You're a Thousandaire!")
    } else {
        return
    }
}