var GooglePlayParser = require('./google_play_parser')

function* parseAndroidApp(appPackage) {
    var parser = new GooglePlayParser()
    return yield parser.parse(appPackage)
}

module.exports.parseAndroidApp = parseAndroidApp
