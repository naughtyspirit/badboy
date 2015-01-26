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
    return {
        name: $('div .document-title').text().trim(),
        categories : [$('.category').text().trim()],
        icon : $('.cover-image').attr('src'),
        isFree: $('.price.buy.id-track-click span').text().trim() == "Install",
        package: $('.details-wrapper.apps').attr('data-docid'),
        description : $('.id-app-orig-desc').html()
    }
}
module.exports = GooglePlayParser

