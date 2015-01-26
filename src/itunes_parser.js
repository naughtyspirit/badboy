var Request = require('request-promise')
var config = require('./config')

var iTunesParser = function() {
}

iTunesParser.prototype.parse = function* (appId) {
    var url = config.iTunesUrl + appId
    var options = {
        uri: url,
        method: "GET"
    }
    var response = yield Request(options)
    var app = this.parseJSON(JSON.parse(response))
    app.url = config.appStoreUrl + appId
    return app
}

iTunesParser.prototype.parseJSON = function (data) {

    var app = data.results[0]
    return {
        name: app.trackName,
        icon: app.artworkUrl512,
        categories: app.genres,
        package: app.bundleId,
        description: app.description,
        isFree: app.price == 0.00
    }
}

module.exports = iTunesParser
