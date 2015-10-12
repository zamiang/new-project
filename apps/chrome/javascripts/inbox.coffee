module.exports = ->
  InboxSDK.load('1.0', 'sdk_plink_0e992fb64c').then (sdk) ->

    # the SDK has been loaded, now do something with it!
    sdk.Compose.registerComposeViewHandler (composeView) ->

      # a compose view has come into existence, do something with it!
      composeView.addButton
        title: "My Nifty Button!"
        iconUrl: "https://www.plink.nyc/img/plink-favicon.png"
        onClick: (event) ->
          event.composeView.insertTextIntoBodyAtCursor('Hello World!')
