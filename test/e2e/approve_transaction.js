const resetDb = require('../lib/reset_db.js');

module.exports = {
  '@tags': ['approve_transaction'],
  before: (client) => {
    resetDb(client);
  },

  'login': (client) => {
    client
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=email]', 'testuser@opencollective.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
  },

  'connect host Paypal account': (client) => {
    client
      .click('.Button--paypal')
      .waitForElementVisible('#loadLogin', 10000)
      .click('#loadLogin')
      .pause(1000)
      .waitForElementVisible('input#login_email', 10000)
      .setValue('input#login_email', 'admin@opencollective.com')
      .setValue('input#login_password', 'sandbox123')
      .click('#submitLogin')
      .pause(1750)
      .waitForElementVisible('input.button.primary.default', 10000)
      .click('input.button.primary.default')
      .waitForElementVisible('#returnToMerchant', 25000)
      .click('#returnToMerchant')
      .waitForElementVisible('.PaypalReminder', 10000)
      .verify.containsText('.PaypalReminder', 'You have successfully connected your PayPal account')
  },

  'set personal paypal email': (client) => {
    client
      .url('http://localhost:3000/profile')
      .waitForElementVisible('#editProfileBtn', 5000)
      .click('#editProfileBtn')
      .waitForElementVisible('input#paypalEmail', 2000)
      .setValue('input#paypalEmail', 'testuser@opencollective.com')
      .click('#saveBtn')
  },
  
  'submit a new expense (already reimbursed)': (client) => {
    client
      .url('http://localhost:3000/groups/1/transactions/new')
      .setValue('.js-transaction-description input', 'Expense already reimbursed')
      .setValue('.js-transaction-amount input', 20)
      .waitForElementVisible("option[value='manual']", 1000)
      .click("option[value='manual']")
      .submitForm('form.TransactionForm-form')
      .waitForElementVisible('.Transaction', 1500)
      .assert.containsText('.Transaction:first-child', 'Pending')
  },

  'approve an expense already reimbursed (manual)': (client) => {
    client
      .click('.Transaction')
      .waitForElementVisible('.Button--approve', 1000)
      .assert.containsText('.Button--approve', 'APPROVE')
      .click('.Button--approve')
      .pause(1000)
      .waitForElementVisible('.Transaction', 5000)
      .pause(1000) // wait for transaction
      .assert.urlEquals('http://localhost:3000/groups/1/transactions')
      .assert.containsText('.Transaction:first-child', 'Reimbursed')
  },

  'submit a new expense to be reimbursed': (client) => {
    client
      .url('http://localhost:3000/groups/1/transactions/new')
      .setValue('.js-transaction-description input', 'Expense to be reimbursed via PayPal')
      .setValue('.js-transaction-amount input', 5)
      .waitForElementVisible("option[value='paypal']", 1000)
      .click("option[value='paypal']")
      .submitForm('form.TransactionForm-form')
      .waitForElementVisible('.Transaction', 1500)
      .waitForElementVisible('.Export-link', 1500)
  },

  'approve and pay an expense via paypal': (client) => {
    client
      .click('.Transaction')
      .waitForElementVisible('.Button--approve', 1000)
      .assert.containsText('.Button--approve', 'APPROVE AND PAY')
      .click('.Button--approve') // this may take some time as it is calling paypal sandbox
      .pause(2000)
      .waitForElementVisible('.Transaction', 10000)
      .pause(1000) // wait for transaction
      .assert.urlEquals('http://localhost:3000/groups/1/transactions')
      .assert.containsText('.Transaction:first-child', 'Reimbursed')
      .end();
  }
};
