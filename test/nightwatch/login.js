module.exports = {
  beforeEach: function(client) {
    client
      .url("http://localhost:3000/app/login")
      .waitForElementVisible("body", 1000);
  },

  "Load login page with both fields and submit button" : function (client) {
    client
      .assert.title("OpenCollective - create and fund your collective transparently")
      .waitForElementVisible('input[type=email', 1000)
      .waitForElementVisible('input[type=password', 1000)
      .waitForElementVisible('button[type=submit', 1000)
      .end();
  },

  "Sign into login page" : function (client) {
    client
      .assert.title("OpenCollective - create and fund your collective transparently")
      .setValue('input[type=email]', 'devuser@opencollective.com')
      .setValue('input[type=password', 'password')
      .click('button[type=submit')
      .pause(1000)
      .assert.containsText('body', "My collectives")
      .end();
  },

};