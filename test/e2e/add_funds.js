module.exports = {
  '@tags': ['add_funds'],
  beforeEach: (client) => {
    client

      // reset test database
      .url('https://opencollective-test-api.herokuapp.com/database/reset')
      .pause(1000)

      // login
      .url('http://localhost:3000/app/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=email]', 'testuser@opencollective.com')
      .setValue('input[type=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)

      // check main page
      .assert.containsText('body', 'My collectives')

      // select a collective
      .click('div[class=GroupLink]')
      .pause(1000)
      .assert.containsText('body', 'CURRENT BALANCE')

      // click on footer
      .click('div[class=Footer-addButton]')
      .waitForElementVisible('div[class=PopOverMenu-group]', 1000)
      .assert.containsText('div[class=PopOverMenu-group]', 'Add funds')

      // click on 'Add funds'
      .click('div[class=PopOverMenu-item]:nth-child(1)')
      .pause(1000)
      .assert.containsText('body', 'Add funds to OpenCollective Test Group')
      .assert.urlContains('app/groups/1/funds/');
  },

  'Add funds': (client) => {
    const description = 'Budget for this month'; // TODO: if we don't reset the db, then add a random string here
    const amount = 100;

    client
      .setValue('input[class=Field]:nth-child(1)', amount)
      // .setValue('input[class=Field]:nth-child(2)', description)
      // Hack below because above CSS selector isn't working
      .keys('\t')
      .pause(500)
      .keys(description)

      .click('button[type=submit')
      .pause(1000)
      .assert.urlContains('app/groups/1/transactions')
      .assert.containsText('.Transaction', description.toUpperCase())
      .end();
  },

  'Shows an error message if an empty form is submitted': (client) => {
    client
      .click('button[type=submit')
      .pause(1000)
      .assert.urlContains('app/groups/1/funds/')
      .assert.containsText('.Notification', '"Description" is not allowed to be empty')
      .end();
  }
};