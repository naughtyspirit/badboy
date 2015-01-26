var should = require('chai').should()
var iTunesParser = require('../src/itunes_parser')
var Fs = require('fs')
var _ = require('underscore')

describe("iTunesParser", function() {

    beforeEach(function* (){
        global.testApp = {
            name: "Yelp",
            icon: "http://a1192.phobos.apple.com/us/r30/Purple3/v4/2e/04/95/2e04951a-3606-a74b-b0af-5821114b5b4d/mzl.xzbqakah.png",
            url: "link",
            categories: ["Travel", "Navigation"],
            description: "description",
            package: "com.yelp.yelpiphone",
            isFree: true,
        }
        var appHtml = Fs.readFileSync('test/data/ios_app_source.json').toString()
        global.app = new iTunesParser().parseJSON(JSON.parse(appHtml))
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
