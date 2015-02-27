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
    return {
        name: $('div .document-title').text().trim(),
        categories : [$('.category').text().trim()],
        icon : $('.cover-image').attr('src'),
        isFree: $('.price.buy.id-track-click span').text().trim() == "Install",
        package: $('.details-wrapper.apps').attr('data-docid'),
        description : $('.id-app-orig-desc').html(),
        developer: developer 
    }
}
module.exports = GooglePlayParser

