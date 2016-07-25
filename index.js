var fs = require('fs')
var path = require('path')

var nightmare = require('nightmare')({ show: false })
var jsdom = require('jsdom')
var dateFormat = require('dateformat')

console.log('One moment. Logging in...')

// InStreamLogin

nightmare
  .goto('https://twitter.com/login') // open twitter
  .type('input.js-username-field.email-input.js-initial-focus', process.argv[2]) // enter username
  .wait(1500)
  .type('input.js-password-field', process.argv[3]) // enter password
  .wait(1500)
  .click('button.submit.btn.primary-btn') // login
  .wait(5000)
  .scrollTo(999999, 0) // load more tweets
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .evaluate(scrape)
  .end()
  .then(scan)
  .catch(function (error) {
    console.log('There was an error: ', error)
  })

// search DOM for promoted tweets
function scrape () {
  console.log('Scraping all promoted tweets...')

  // push innerHTML of promoted tweets to array
  var array = []
  var tweets = document.getElementsByClassName('promoted-tweet')

  for (var tweet of tweets) {
    array.push(tweet.innerHTML)
  }

  return array
}

function scan (tweets) {
  for (var tweet of tweets) {
    jsdom.env(tweet, function (err, window) {
      if (err) {
        throw err
      } else {
        // extract username, url, text from HTML markup
        var username = window.document.getElementsByClassName('js-action-profile-name')[1].getElementsByTagName('b')[0].textContent
        var url = 'https://twitter.com' + window.document.getElementsByClassName('js-permalink')[0].href
        var text = window.document.getElementsByClassName('js-tweet-text')[0].textContent

        // compose timestamp (eg. 2016-12-25_09-00-05-175)
        var timestamp = dateFormat(new Date(), 'yyyy-mm-dd_HH-MM-ss-l')

        // compose filename
        var filename = path.resolve(__dirname, `${timestamp}_${username}`)

        // compose text file content
        var output = `Username: ${username}\n\nURL: ${url}\n\nTweet: ${text}`

        // write to disk
        saveToText(filename, output)
        saveToImage(filename, url)
      }
    })
  }
}

// export tweet as text file
function saveToText (filename, output) {
  fs.writeFile(filename + '.txt', output, function (err) {
    if (err) {
      throw err
    } else {
      console.log('Wrote a text file!')
    }
  })
}

// export tweet as image
function saveToImage (filename, url) {
  require('nightmare')({ show: false })
    .goto(url)
    .wait(1500)
    .screenshot(filename + '.png')
    .end()
    .then(function () {
      console.log('Took a screenshot!')
    })
    .catch(function (error) {
      console.log('There was an error: ', error)
    })
}
