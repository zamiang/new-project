_ = require 'underscore'
Backbone = require 'backbone'
Message = require '../models/message.coffee'
Q = require 'q'

module.exports = class Messages extends Backbone.Collection

  model: Message

  parse: (response) =>
    response.messages

  fetch: ->
    gapi.client.gmail.users.messages.list({
      userId: "me",
      q: 'in:sent'
      maxResults: 10
    }).execute((response) =>
      # TODO: Look at a more 'backbone' way to do override both fetch and parse
      @add @parse(response)
    )

  fetchMessages: (done) ->
    Q.allSettled(
      for model in @models
        model.fetch()
    ).then(() ->
      console.log 'done'
    ).fail((error) ->
      console.log error
    )
