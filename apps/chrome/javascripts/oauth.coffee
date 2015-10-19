google = require('googleapis')
plus = google.plus('v1')
OAuth2 = google.auth.OAuth2
env = require('../../../env.json').installed

module.exports = ->

  oauth2Client = new OAuth2(env.client_id, env.client_secret, env.redirect_uris)

  # generate a url that asks permissions for Google+ and Google Calendar scopes
  scopes = [
    'https://www.googleapis.com/auth/plus.me'
    # 'https://www.googleapis.com/auth/calendar'
    # 'https://www.googleapis.com/auth/gmail.modify'
  ];

  url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: scopes
  })

  # # Retrieve tokens via token exchange explained above or set them:
  # oauth2Client.setCredentials({
  #   access_token: 'ACCESS TOKEN HERE',
  #   refresh_token: 'REFRESH TOKEN HERE'
  # })

  # plus.people.get({ userId: 'me', auth: oauth2Client }, (err, response) ->
  #   console.log err
  #   console.log response
  # )
