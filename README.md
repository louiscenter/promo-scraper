# promo-scraper

A promoted tweet scraper cobbled together in response to [this tweet](https://twitter.com/adamhrv/status/757202073972801536) by [Adam Harvey](https://twitter.com/adamhrv).

## Notes

This utility requires Node.js, and was built and tested using Node v5.4.0, on Mac OS X 10.11.5.

Twitter currently distributes different login pages depending on where you connect from geographically. `promo-scraper` is currently tested on the German login page, but will be updated soon to handle different login pages.

## Usage

```
$ git clone https://github.com/louiscenter/promo-scraper.git
$ npm install
$ npm start <TWITTER_USERNAME> <TWITTER_PASSWORD>
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
