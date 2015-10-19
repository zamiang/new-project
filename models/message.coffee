_ = require 'underscore'
Backbone = require 'backbone'
Q = require 'q'

module.exports = class Message extends Backbone.Model

  fetch: ->
    deferred = Q.defer()
    gapi.client.gmail.users.messages.get({
      userId: "me"
      id: @id
    }).execute((data) =>
      @set @parse(data)
      deferred.resolve()
    )
    deferred.promise

  parse: (data) ->
    {
      id: data.id
      threadId: data.threadId
      snippet: data.snippet
      internalDate: new Date(Number(data.internalDate))
      sentTo: @getSentTo(data)
      ccTo: @getCcTo(data)
      bccTo: @getBccTo(data)
    }

  getHeaderField: (field, data) ->
    value = []
    for item in data.payload.headers
      if item.name is field
        value.push item.value
    value

  getSentTo: (data) -> @getHeaderField('To', data)
  getCcTo: (data) -> @getHeaderField('Cc', data)
  getBccTo: (data) -> @getHeaderField('Bcc', data)
