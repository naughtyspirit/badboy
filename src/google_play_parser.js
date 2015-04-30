var Cheerio = require('cheerio')
var Request = require('request-promise')
var config = require('./config')

var GooglePlayParser= function() {
}

GooglePlayParser.prototype.parse = function* (appPackage) {
    var url = config.googlePlayUrl + appPackage
    var options = {
        uri: url + "&hl=en",
        method: "GET"
    }
    var response = yield Request(options)
    var app = this.parseHtml(response)
    app.url = url
    return app
}

GooglePlayParser.prototype.parseHtml = function(appHtml) {
    var $ = Cheerio.load(appHtml)
    var developer = {
        name: $('.document-subtitle.primary span').html()
    }
    $('.dev-link').each(function(i, item) {
        var href = $(item).attr('href');
        if (href && href.indexOf('mailto:') > -1) {
            developer.email = href.substr(7);
        }
    })

    var screenshots = $('img.screenshot');
    var imgs = []
    screenshots.each(function(i, screenshot) {
        imgs.push(screenshot.attribs.src)
    });
    return {
        name: $('div .document-title').text().trim(),
        categories : [$('.category').text().trim()],
        icon : $('.cover-image').attr('src'),
        isFree: $('.price.buy.id-track-click span').text().trim() == "Install",
        package: $('.details-wrapper.apps').attr('data-docid'),
        description : $('.id-app-orig-desc').html(),
        installs: $('div[itemprop="numDownloads"]').text().replace(/\s+/g, ''),
        contentRating: $('div[itemprop="contentRating"]').text().trim(),
        score: {
            oneStars:  $('div.rating-bar-container.one span.bar-number').text().trim(),
            twoStars:  $('div.rating-bar-container.two span.bar-number').text().trim(),
            threeStars:  $('div.rating-bar-container.three span.bar-number').text().trim(),
            fourStars:  $('div.rating-bar-container.four span.bar-number').text().trim(),
            fiveStars: $('div.rating-bar-container.five span.bar-number').text().trim(),
            count: $('span.reviews-num').text().trim(),
            total: $('div.score').text().trim()
        },
        screenshots: imgs,
        developer: developer 
    }
}
module.exports = GooglePlayParser

