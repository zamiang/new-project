module.exports = ->
  chrome.identity.getAuthToken { 'interactive': true }, (token) ->
    console.log(token);
