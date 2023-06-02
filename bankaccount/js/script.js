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

    // vaidates account and deposit ammount
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert('Invalid deposit amount')
        return
    } else if (!account) {
        alert('You must first set a name for the account holder.')
        return
    } else {
      account.deposit(depositAmount)
    }

    // confetti
    const confettiSettings = {
        particleCount: 200,
        spread: 140,
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

  // STOPS LOCAL STRORAGE FROM BANKING 'isNAN', IN CASE OF CANCLED PROMPT
  if (withdrawalAmount = isNaN) {
    withdrawalAmount = 0
  }
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

// VISIBILITY CHANGE EVENT LISTNER
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    document.title = 'Elite Bank - Away'
  } else {
    document.title = 'Elite Bank - Account Dashboard'
  }
})

// BANK ACCOUNT CLOSURE FUNCTION
function bankAccount(ownerName, initialBalance) {
  let balance = initialBalance
  let owner = ownerName

  return {
    withdrawal: function (withdrawalAmount) {
      if (withdrawalAmount <= 0) {
        alert('Withdrawal ammount must be greater than 0.')
        console.log("Withdrawal amount must be greater than 0")
        return
      } else if (withdrawalAmount > balance) {
        alert('Insufficient funds')
        console.log("Insufficient balance for withdrawal")
        return
      } else {
        balance -= withdrawalAmount
        $("current-balance").innerHTML = `$${formatMoney(balance)}`
        // Store updated balance in localStorage
        localStorage.setItem(owner, balance)
      }
    },

    deposit: function (depositAmount) {
      if (depositAmount <= 0) {
        alert("Deposit amount must be greater than 0")
        console.log("Deposit amount must be greater than 0")
        return
      } else {
        balance += depositAmount
        updateBalanceDisplay(balance)
        // Store updated balance in localStorage
        localStorage.setItem(owner, balance)
      }
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