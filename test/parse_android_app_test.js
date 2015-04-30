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
            publicationDate: "January 14, 2015",
            description: "description",
            package: "com.yodo1.crossyroad",
            isFree: true,
            developer: {
                name: "Yodo1 Games",
                email: "gpsupport@yodo1.com",
                website: "http://www.yodo1games.com",
                devUrl: '/store/apps/developer?id=Yodo1+Games',
                physicalAddress: '1119 – 1120 Building B, Chaowai SOHO 6B Chaoyangmenwai Ave, Chaoyang District, Beijing 100020 People’s Republic of China'
            },
            score: {
                total: "4.6",
                count: "682,307",
                oneStars: "18,655",
                twoStars: "9,336",
                threeStars: "26,977",
                fourStars: "89,043",
                fiveStars: "538,296"
            },
            installs: "5,000,000-10,000,000",
            contentRating: "Medium Maturity",
            screenshots: [
                "https://lh3.ggpht.com/DYOiohSva76WelG4TAZJBqe4yK0DWg1hCBYhKhyJczIBI6lJuWVvKeMn9_tElqNalso=h310-rw",
                "https://lh3.ggpht.com/NblmXRGePPDr8CnbJfzuwZm49HJBblUNrfM5KInP_bM6uXKR03_H1bVQwo3-VzjTdGw=h310-rw",
                "https://lh3.ggpht.com/5g3wE47OlIShKfGZrPbmLyBEkEtJ0rp_JNdJowxr8zc1Qx4C5WarFr1hzHxPLPHnss0=h310-rw",
                "https://lh3.ggpht.com/rjuaaUOoHr3xG80Zjgx6rgcuC5vX80MNjd4apeBGPeyOHZ0mK9fm8n51QltGxktHStXD=h310-rw",
                "https://lh3.ggpht.com/aq4e9TEnT1XwLWR4-hLq0HMhNCe-8GOD_xuYo60jI79KpC6M0EuribVz0TTHUfhNtg=h310-rw",
                "https://lh3.ggpht.com/Cz9Avnh5QtjiMwzvOc_QRbGiYwxEoomOvKz6qDpX4-1kpST5tcRum7u2o2PrteCc6xs=h310-rw",
                "https://lh3.ggpht.com/QnlgMyOk0d6hSUZerIYr821rGd5EaP8ye_DF-_5sY_XWPCPn7QrkPfMQwMYod-9pJz8=h310-rw",
                "https://lh3.ggpht.com/fmlUNX_CPupAkczNeAZ5SLYE6xhDxDBOeNzgsrx70yqJokvcxMpDHyN1JQEUTociZ6w=h310-rw",
                "https://lh3.ggpht.com/EMKZlTiem3GJ3fT2awb_X62JT4jESEckxdGDi5IffS00bl-Awbsg0IY40yrTp7ggXAs=h310-rw",
                "https://lh3.ggpht.com/lJ3ESBHQ09u6d3Q29QBMKIztwPhKMimmkAoqnKGAHnUP8Uwam-zfRaYG_a0Qg6wO9g=h310-rw",
                "https://lh3.ggpht.com/XMXTtW0WgqiIOcdZ4li9-io7JtmWz-S6kh-z55AwDH1YeWI_g0erJ5Ham1xjlxYhILXT=h310-rw",
                "https://lh3.ggpht.com/iMF7wNrvZJHmbltkUSfCjG4on-9Os_iO7Gn7Kverp-I4RKulPwRfswZlRyrrrlP-v9k=h310-rw",
                "https://lh3.ggpht.com/h5TNghLlUx-dEh4t5x2fPouFxuXX3A9MKdHoi96YCRPZmu6MfNPUwweeLx6gYDlcwke-=h310-rw",
                "https://lh3.ggpht.com/6vjTj7asbDOk5wbTmnvx5zjhPj2SOiTNRGWpo4rRpTeHjrUMAoU4rJDuEJmxDQHHK4o=h310-rw",
                "https://lh3.ggpht.com/-NGwF5mqImy_nH4jfoCRxGlK58qQ1AjiA5piaPjxbwEXJj9Lxt9YIHAzNxYewiMUK-A=h310-rw"
            ]
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

    it("should parse content rating", function*() {
        app.contentRating.should.eql(testApp.contentRating)
    })

    it("should parse installs", function*() {
        app.installs.should.eql(testApp.installs)
    })

    it("should parse installs", function*() {
        app.installs.should.eql(testApp.installs)
    })

    it("should parse score", function*() {
        app.score.should.eql(testApp.score)
    })

    it("should parse screenshots", function*() {
        app.screenshots.should.eql(testApp.screenshots)
    })

    it("should parse publication date", function*() {
        app.publicationDate.should.eql(testApp.publicationDate)
    })

    it("should parse developer email", function*() {
        app.developer.email.should.eql(testApp.developer.email)
    })

    it("should parse developer website", function*() {
        app.developer.website.should.eql(testApp.developer.website)
    })

    it("should parse developer physical address", function*() {
        app.developer.physicalAddress.should.eql(testApp.developer.physicalAddress)
    })

    it("should parse developer devUrl", function*() {
        app.developer.devUrl.should.eql(testApp.developer.devUrl)
    })
})
