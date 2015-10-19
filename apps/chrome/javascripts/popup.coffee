Messages = require('../../../collections/messages.coffee')

module.exports = ->
  window.onGoogleLibraryLoaded = ->
    # TODO: Handle user changing their password
    chrome.identity.getAuthToken { interactive: true }, (accessToken) ->
      gapi.auth.setToken({access_token: accessToken})
      gapi.client.load('gmail', 'v1', ->
        window.messages = new Messages()
        messages.fetch()
      )
