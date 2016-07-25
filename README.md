# promo-scraper

A promoted tweet scraper cobbled together in response to [this tweet](https://twitter.com/adamhrv/status/757202073972801536) by [Adam Harvey](https://twitter.com/adamhrv).

In its current form, `promo-scraper` will login to your Twitter account, scroll through 5 pages of tweets, and then scrape any promoted tweets that appear. Each tweet is saved into a text file, then an additional screenshot is taken for posterity. This data will appear in the same directory as `promo-scraper`.

![Screenshot of promo-scraper, courtesy of Adam Harvey](https://pbs.twimg.com/media/CoOiQNnXEAAukbj.jpg)

## Notes
`promo-scraper` requires Node.js, and was built and tested using Node v5.4.0, on Mac OS X 10.11.5.

`promo-scraper` utilises Nightmare.js, jsdom, and dateformat.

## Usage

```
$ git clone https://github.com/louiscenter/promo-scraper.git
$ cd promo-scraper
$ npm install
$ npm start <TWITTER_USERNAME> <TWITTER_PASSWORD>
```

## Todo
- [ ] Add option to show browser window during scan
- [ ] Use selector detection rather than timeouts for login/scrolling
- [ ] Improve error handling

## License
[MIT](https://tldrlegal.com/license/mit-license)
