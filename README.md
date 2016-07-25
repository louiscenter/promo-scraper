# promo-scraper

A promoted tweet scraper cobbled together in response to [this tweet](https://twitter.com/adamhrv/status/757202073972801536) by [Adam Harvey](https://twitter.com/adamhrv).

In its current form, `promo-scraper` will login to your Twitter account, scroll through 5 pages of tweets, and then scrape any promoted tweets that appear. Each tweet is saved into a text file, then an additional screenshot is taken for posterity. This data will appear in the same directory as `promo-scraper`.

## Notes
Twitter currently distributes different login pages depending on where you connect from geographically. `promo-scraper` is currently tested on the German login page, but will be updated soon to handle different login pages.

`promo-scraper` requires Node.js, and was built and tested using Node v5.4.0, on Mac OS X 10.11.5.

`promo-scraper` utilises Nightmare.js, jsdom, and dateformat.

## Usage

```
$ git clone https://github.com/louiscenter/promo-scraper.git
$ cd promo-scraper
$ npm install
$ npm start <TWITTER_USERNAME> <TWITTER_PASSWORD>
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
