module.exports = {

  beforeEach: (client) => {
    client
      .url('http://localhost:3000/app/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=email]', 'testuser@opencollective.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .assert.containsText('body', 'My collectives')
      .url('http://localhost:3000/app/groups/1/transactions/new')
      .waitForElementVisible('body', 1000);
  },

  'Submits an expense': (client) => {
    const description = 'Day out in tahoe';
    const amount = 10;

    client
      .assert.containsText('body', 'Submit Expense')
      .setValue('.js-transaction-description input', description)
      .setValue('.js-transaction-amount input', amount)
      .submitForm('form.TransactionForm-form')
      .pause(1000)
      .assert.urlContains('app/groups/1/transactions')
      .assert.containsText('.Transaction', description.toUpperCase())
      .end();
  },

  'Shows an error message if an empty form is submitted': (client) => {
    client
      .assert.containsText('body', 'Submit Expense')
      .submitForm('form.TransactionForm-form')
      .pause(1000)
      .assert.urlContains('app/groups/1/transactions/new')
      .assert.containsText('.Notification', '"Description" is not allowed to be empty')
      .end();
  }
};