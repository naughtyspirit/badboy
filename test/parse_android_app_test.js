var should = require('chai').should()
var GooglePlayParser = require('../src/google_play_parser')
var Fs = require('fs')
var _ = require('underscore')

describe("GooglePlayParser", function() {

    beforeEach(function* (){
        global.testApp = {
            name: "Crossy Road",
            icon: "https://lh3.ggpht.com/KFReqMK_igefRt9h5Ywy1JfHk9Q3AvB1-6hY1TFWCBWAPjBCDzSp8kWXjy3-ANc_l_2f=w300-rw",
            url: "link",
            categories: ["Action"],
            description: "description",
            package: "com.yodo1.crossyroad",
            isFree: true,
        }
        var appHtml = Fs.readFileSync('test/data/android_app_source.html').toString()
        global.app = new GooglePlayParser().parseHtml(appHtml)
    })

    it("should parse name", function*() {
       app.name.should.eql(testApp.name) 
    })

    it("should parse icon", function*() {
       app.icon.should.eql(testApp.icon) 
    })

    it("should parse category", function*() {
       app.categories.should.eql(testApp.categories) 
    })

    it("should parse package", function*() {
       app.package.should.eql(testApp.package) 
    })

    it("should parse pricing", function*() {
       app.isFree.should.eql(testApp.isFree) 
    })

})
