module.exports = {
  '@tags': ['approve_transaction'],
  beforeEach: (client) => {
    const description = `Day out in tahoe ${Math.random()}`;
    const amount = 10;

    client

      // reset test database
      .url('https://opencollective-test-api.herokuapp.com/database/reset')

      // login
      .url('http://localhost:3000/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=email]', 'testuser@opencollective.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)

      // Connect Paypal account
      .click('.Button--paypal')
      .waitForElementVisible('#loadLogin', 10000)
      .click('#loadLogin')
      .waitForElementVisible('input#login_email', 10000)
      .setValue('input#login_email', 'admin@opencollective.com')
      .setValue('input#login_password', 'sandbox123')
      .click('#submitLogin')
      .pause(1500)
      .waitForElementVisible('input.button.primary.default', 10000)
      .click('input.button.primary.default')
      .waitForElementVisible('#returnToMerchant', 10000)
      .click('#returnToMerchant')
      .waitForElementVisible('.PayPalReminder', 10000)
      .verify.containsText('.PaypalReminder', 'You have successfully approved your Paypal account')

      // submit transaction
      .url('http://localhost:3000/groups/1/transactions/new')
      .setValue('.js-transaction-description input', description)
      .setValue('.js-transaction-amount input', amount)
      .waitForElementVisible("option[value='manual']", 1000)
      .click("option[value='manual']")
      .submitForm('form.TransactionForm-form')
      .waitForElementVisible('.Transaction', 1500)
      .waitForElementVisible('.Export-link', 1500);
  },

  'Approves an expense': (client) => {
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