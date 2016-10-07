const resetDb = require('../lib/reset_db.js');

module.exports = {
  '@tags': ['approve_expense'],
  before: (client) => {
    resetDb(client)
  },

  'login': (client) => {
    client
      .url('http://localhost:3030/login')
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
      .waitForElementVisible('input.button.primary.default', 30000)
      .click('input.button.primary.default')
      .waitForElementVisible('#returnToMerchant', 60000)
      .click('#returnToMerchant')
      .waitForElementVisible('.PaypalReminder', 30000)
      .verify.containsText('.PaypalReminder', 'You have successfully connected your PayPal account')
  },


  'set personal paypal email': (client) => {
    client
      .url('http://localhost:3030/profile')
      .waitForElementVisible('#editProfileBtn', 5000)
      .click('#editProfileBtn')
      .waitForElementVisible('input#paypalEmail', 2000)
      .setValue('input#paypalEmail', 'testuser@opencollective.com')
      .click('#saveBtn')
  },


  'approve an expense already reimbursed (manual)': (client) => {
    client
      // add funds first to be able to approve manually
      .url('http://localhost:3030/groups/1/funds/')
      .waitForElementVisible('.js-amount input', 5000)
      .setValue('.js-amount input', 1000)
      .setValue('.js-description input', "blah description")
      .click('button[type=submit')
      .pause(1000)
      .assert.urlContains('groups/1/transactions')
      // navigate to expense approval flow
      .url('http://localhost:3030/')
      .waitForElementVisible('.Expense', 1000)
      .click('.Expense:nth-child(2)')
      .waitForElementVisible('.Button--approve', 1000)
      .assert.containsText('.Button--approve', 'APPROVE')
      .click('.Button--approve')
      .pause(2000)
      .waitForElementVisible('.Expense', 5000)
      .pause(2000) // wait for expense
      .assert.urlEquals('http://localhost:3030/')
      .url('http://localhost:3030/groups/1/transactions')
      .waitForElementVisible('.Transaction', 5000);

      // Once this issue is resolved: https://github.com/OpenCollective/OpenCollective/issues/230,
      // please reenable this check. #AddFundDonationIssue
      //.assert.containsText('.Transaction:first-child', 'EXPENSE 2')
  },

  'approve an expense via paypal': (client) => {
    client
      .url('http://localhost:3030/')
      .waitForElementVisible('.Expense', 5000)
      .click('.Expense:first-child')
      .waitForElementVisible('.Button--approve', 1000)
      .assert.containsText('.Button--approve', 'APPROVE AND PAY')
      .click('.Button--approve')
      .pause(10000)
      .waitForElementVisible('.Well', 20000)
      .pause(2000)
      .assert.urlEquals('http://localhost:3030/')
      .url('http://localhost:3030/groups/1/transactions')
      .waitForElementVisible('.Transaction', 5000)
      // Once this issue is resolved: https://github.com/OpenCollective/OpenCollective/issues/230,
      // please reenable this check. #AddFundDonationIssue
      //.assert.containsText('.Transaction:first-child', 'EXPENSE 1')
      .end()
  },
};
