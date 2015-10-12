module.exports = ->
  ###*
  # Get the current URL.
  #
  # @param {function(string)} callback - called when the URL of the current tab
  #   is found.
  ###
  getCurrentTabUrl = (callback) ->
    # Query filter to be passed to chrome.tabs.query - see
    # https://developer.chrome.com/extensions/tabs#method-query
    queryInfo =
      active: true
      currentWindow: true
    chrome.tabs.query queryInfo, (tabs) ->
      # chrome.tabs.query invokes the callback with a list of tabs that match the
      # query. When the popup is opened, there is certainly a window and at least
      # one tab, so we can safely assume that |tabs| is a non-empty array.
      # A window can only have one active tab at a time, so the array consists of
      # exactly one tab.
      tab = tabs[0]
      # A tab is a plain object that provides information about the tab.
      # See https://developer.chrome.com/extensions/tabs#type-Tab
      url = tab.url
      # tab.url is only available if the "activeTab" permission is declared.
      # If you want to see the URL of other tabs (e.g. after removing active:true
      # from |queryInfo|), then the "tabs" permission is required to see their
      # "url" properties.
      console.assert typeof url == 'string', 'tab.url should be a string'
      callback url
      return
    # Most methods of the Chrome extension APIs are asynchronous. This means that
    # you CANNOT do something like this:
    #
    # var url;
    # chrome.tabs.query(queryInfo, function(tabs) {
    #   url = tabs[0].url;
    # });
    # alert(url); // Shows "undefined", because chrome.tabs.query is async.
    return

  ###*
  # @param {string} searchTerm - Search term for Google Image search.
  # @param {function(string,number,number)} callback - Called when an image has
  #   been found. The callback gets the URL, width and height of the image.
  # @param {function(string)} errorCallback - Called when the image is not found.
  #   The callback gets a string that describes the failure reason.
  ###
  getImageUrl = (searchTerm, callback, errorCallback) ->
    # Google image search - 100 searches per day.
    # https://developers.google.com/image-search/
    searchUrl = 'https://ajax.googleapis.com/ajax/services/search/images' + '?v=1.0&q=' + encodeURIComponent(searchTerm)
    x = new XMLHttpRequest
    x.open 'GET', searchUrl
    # The Google image search API responds with JSON, so let Chrome parse it.
    x.responseType = 'json'

    x.onload = ->
      # Parse and process the response from Google Image Search.
      response = x.response
      if !response or !response.responseData or !response.responseData.results or response.responseData.results.length == 0
        errorCallback 'No response from Google Image search!'
        return
      firstResult = response.responseData.results[0]
      # Take the thumbnail instead of the full image to get an approximately
      # consistent image size.
      imageUrl = firstResult.tbUrl
      width = parseInt(firstResult.tbWidth)
      height = parseInt(firstResult.tbHeight)
      console.assert typeof imageUrl == 'string' and !isNaN(width) and !isNaN(height), 'Unexpected respose from the Google Image Search API!'
      callback imageUrl, width, height
      return

    x.onerror = ->
      errorCallback 'Network error.'
      return

    x.send()
    return

  renderStatus = (statusText) ->
    document.getElementById('status').textContent = statusText
    return

  document.addEventListener 'DOMContentLoaded', ->
    getCurrentTabUrl (url) ->
      # Put the image URL in Google search.
      renderStatus 'Performing Google Image search for ' + url
      getImageUrl url, ((imageUrl, width, height) ->
        renderStatus 'Search term: ' + url + '\n' + 'Google image search result: ' + imageUrl
        imageResult = document.getElementById('image-result')
        # Explicitly set the width/height to minimize the number of reflows. For
        # a single image, this does not matter, but if you're going to embed
        # multiple external images in your page, then the absence of width/height
        # attributes causes the popup to resize multiple times.
        imageResult.width = width
        imageResult.height = height
        imageResult.src = imageUrl
        imageResult.hidden = false
        return
      ), (errorMessage) ->
        renderStatus 'Cannot display image. ' + errorMessage
        return
      return
    return
