const transaction = {
  description: `Day out in tahoe ${Math.random()}`,
  amount: 10
};

module.exports = {
  '@tags': ['approve_transaction'],
  before: (client) => {
    client
      // reset test database
      .url('https://opencollective-test-api.herokuapp.com/database/reset')
      .url('http://localhost:3060/database/reset')
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
      .pause(1500)
      .waitForElementVisible('input.button.primary.default', 10000)
      .click('input.button.primary.default')
      .waitForElementVisible('#returnToMerchant', 10000)
      .click('#returnToMerchant')
      .waitForElementVisible('.PaypalReminder', 10000)
      .verify.containsText('.PaypalReminder', 'You have successfully approved your Paypal account')
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
  
  'submit a new expense': (client) => {
    client
      .url('http://localhost:3000/groups/1/transactions/new')
      .setValue('.js-transaction-description input', transaction.description)
      .setValue('.js-transaction-amount input', transaction.amount)
      .waitForElementVisible("option[value='paypal']", 1000)
      .click("option[value='paypal']")
      .submitForm('form.TransactionForm-form')
      .waitForElementVisible('.Transaction', 1500)
      .waitForElementVisible('.Export-link', 1500);    
  },

  'approve an expense': (client) => {
    client
      .click('.Transaction')
      .waitForElementVisible('.Button--approve', 1000)
      .assert.containsText('body', 'APPROVE')
      .click('.Button--approve')
      .waitForElementVisible('.Transaction', 2000)
      .pause(1000) // wait for transaction
      .assert.urlEquals('http://localhost:3000/groups/1/transactions')
      .assert.containsText('.Transaction:first-child', 'Reimbursed')
      .end();
  }
};
