module.exports = ->
  authenticatedXhr = (callback) ->
    chrome.identity.getAuthToken { interactive: true }, (accessToken) ->
      gapi.auth.setToken({access_token: accessToken})
      gapi.client.load('gmail', 'v1', callback)

  window.onGoogleLibraryLoaded = ->
    authenticatedXhr( ->
      gapi.client.gmail.users.messages.list({userId: "me", q: 'in:sent' }).execute((data) -> console.log(data) )
    )
