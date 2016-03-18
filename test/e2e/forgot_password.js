const config = require('config');
const resetDb = require('../lib/reset_db.js');

const page = {
  title: "OpenCollective - create and fund your collective transparently"
}


module.exports = {
  beforeEach: (client) => {
    resetDb(client)
      .url(`${config.host.app}/forgot`)
      .waitForElementVisible("body", 1000);
  },

  "Load forgot password page with email input and submit button": (client) => {
    client
      .assert.title(page.title)
      .waitForElementVisible('input[type=email', 1000)
      .waitForElementVisible('button[type=submit', 1000)
      .end();
  },

  "Submit an email": (client) => {
    client
      .assert.title(page.title)
      .setValue('input[type=email]', 'testuser@opencollective.com')
      .click('button[type=submit')
      .pause(1000)
      .assert.containsText('.Notification', "Email sent")
      .end();
  },

  "Show error message if the email is unknown": (client) => {
    client
      .assert.title(page.title)
      .setValue('input[type=email]', 'wronguser@opencollective.com')
      .click('button[type=submit')
      .pause(1000)
      .assert.containsText('.Notification--error', "User with email wronguser@opencollective.com doesn't exist")
      .end();
  }

};