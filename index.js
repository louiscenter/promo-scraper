var fs = require('fs')
var path = require('path')

var scraper = require('nightmare')({ show: false })
var jsdom = require('jsdom')
var dateFormat = require('dateformat')

console.log('One moment. Logging in...')

scraper
  .goto('https://twitter.com') // open twitter
  .type('input#signin-email.text-input.email-input', process.argv[2]) // enter username
  .wait(1500)
  .type('input#signin-password.text-input.flex-table-input', process.argv[3]) // enter password
  .wait(1500)
  .click('.submit.btn.primary-btn.flex-table-btn.js-submit') // login
  .wait(5000)
  .scrollTo(999999, 0) // load more tweets
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .scrollTo(999999, 0)
  .wait(1500)
  .evaluate(function () {
    console.log('Scraping all promoted tweets...')

    // create an array of promoted tweets HTML
    var array = []
    var tweets = document.getElementsByClassName('promoted-tweet')

    for (var i = 0; i < tweets.length; i++) {
      var tweet = tweets[i].innerHTML
      array.push(tweet)
    }

    return array
  })
  .end()
  .then(function (results) {
    // write each promoted tweet to text file
    for (var i = 0; i < results.length; i++) {
      jsdom.env(results[i], function (err, window) {
        // extract username, url and tweet from HTML markup
        var username = window.document.getElementsByClassName('js-action-profile-name')[1].getElementsByTagName('b')[0].textContent
        var url = 'https://twitter.com' + window.document.getElementsByClassName('js-permalink')[0].href
        var tweet = window.document.getElementsByClassName('js-tweet-text')[0].textContent

        // compose a timestamp (eg. 2016-12-25_09:00:05:175)
        var timestamp = dateFormat(new Date(), 'yyyy-mm-dd_HH-MM-ss-l')

        // compose filename
        var filename = path.resolve(__dirname, timestamp + '_' + username)

        // compose text file content
        var output = 'Username: ' + username + '\n\n' +
                     'URL: ' + url + '\n\n' +
                     'Tweet: ' + tweet

        // export tweet as a text file
        fs.writeFile(filename + '.txt', output, function (err) {
          if (err) {
            throw err
          } else {
            // export tweet as an image
            console.log('Wrote a text file!')
            require('nightmare')({ show: false })
              .goto(url)
              .wait(1500)
              .screenshot(filename + '.png')
              .end()
              .then(function () {
                console.log('Took a screenshot!')
              })
              .catch(function (error) {
                console.log('There was an error: ', error);
              })
          }
        })
      })
    }
  })
  .catch(function (error) {
    console.log('There was an error: ', error);
  })
