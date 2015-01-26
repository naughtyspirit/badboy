var GooglePlayParser = require('./google_play_parser')
var iTunesParser = require('./itunes_parser')

function* getAndroidApp(appPackage) {
    var parser = new GooglePlayParser()
    return yield parser.parse(appPackage)
}

function* getiOSApp(appId) {
    var parser = new iTunesParser()
    return yield parser.parse(appId)
}

module.exports.parseAndroidApp = parseAndroidApp
