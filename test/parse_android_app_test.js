var should = require('chai').should()
var GooglePlayParser = require('../src/google_play_parser')
var Fs = require('fs')
var _ = require('underscore')

describe("GooglePlayParser", function() {

    beforeEach(function* (){
        global.testApp = {
            name: "Crossy Road",
            icon: "https://lh3.googleusercontent.com/nsl94RdPxOnPHGhPh7FMbu5uQ-9o7zC7zfTZAdWphE4CmD3T4E1GVRPgsUT_L6gZWcM=w300-rw",
            url: "link",
            categories: ["Action"],
            publicationDate: "December 14, 2015",
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
                "count": 3258006,
                "fiveStars": 2407560,
                "fourStars": 450342,
                "oneStars": 149097,
                "threeStars": 176317,
                "total": 4.5,
                "twoStars": 74686


            },
            installs: "50,000,000-100,000,000",
            contentRating: "PEGI 3",
            screenshots: [ 'https://lh5.ggpht.com/XMXTtW0WgqiIOcdZ4li9-io7JtmWz-S6kh-z55AwDH1YeWI_g0erJ5Ham1xjlxYhILXT=h310-rw',
                'https://lh3.googleusercontent.com/zteON04fDiVZnbrj4eYGDTEx9yBa4kuUCJz3JycXEtQ0UdwlhnGxcL3qwZ8dceuIxBc=h310-rw',
                'https://lh3.googleusercontent.com/77R6Dx5wOnRNTo6KwFa5iZraMQjI2OeBa3EnTiSIt5bw6Jak8O9HqU8NKss72vVHW58=h310-rw',
                'https://lh3.googleusercontent.com/GWqsOErZJjnk8-HSQg6OxPU_76Zd4-tFTKBR7SmK0y7w_eL7AMDnQGyj1Cn9KHvnQQM8=h310-rw',
                'https://lh5.ggpht.com/Qt7uSu1He2q2yjSzLQIwDM2UUGzyS8meVtgupB6Ywckeh_PoXgLy-_ujdTNR8Rop4Jk=h310-rw',
                'https://lh4.ggpht.com/h5TNghLlUx-dEh4t5x2fPouFxuXX3A9MKdHoi96YCRPZmu6MfNPUwweeLx6gYDlcwke-=h310-rw',
                'https://lh4.ggpht.com/-NGwF5mqImy_nH4jfoCRxGlK58qQ1AjiA5piaPjxbwEXJj9Lxt9YIHAzNxYewiMUK-A=h310-rw',
                'https://lh3.ggpht.com/DYOiohSva76WelG4TAZJBqe4yK0DWg1hCBYhKhyJczIBI6lJuWVvKeMn9_tElqNalso=h310-rw',
                'https://lh3.googleusercontent.com/OjX5QyFOgF_gFvx6DEhoS85VhZqPEC1zFVUuBaQGl7rN_w3glFHV43Y173O_2VQm9BfW=h310-rw',
                'https://lh3.googleusercontent.com/e78DP9mmtu96VW2vu9UwGxe24DGt2NgEg039XCJT4AvvU4og6c40mE4gQOGmjv7cUvk=h310-rw',
                'https://lh3.googleusercontent.com/IQ89PAt65dVjs0U9pBraj1oj3i2DPhK9jUf7-ViVlanyJpUs3JPAeC2aOZPa3jaFPMW4=h310-rw',
                'https://lh6.ggpht.com/So-vyKdJAQckW9C_HnSHhOa5m-1CH183YCwxWFym8VD9vQwvCMgSLnmFRJXvr__JsYxB=h310-rw',
                'https://lh4.ggpht.com/5g3wE47OlIShKfGZrPbmLyBEkEtJ0rp_JNdJowxr8zc1Qx4C5WarFr1hzHxPLPHnss0=h310-rw',
                'https://lh3.ggpht.com/aq4e9TEnT1XwLWR4-hLq0HMhNCe-8GOD_xuYo60jI79KpC6M0EuribVz0TTHUfhNtg=h310-rw',
                'https://lh6.ggpht.com/Cz9Avnh5QtjiMwzvOc_QRbGiYwxEoomOvKz6qDpX4-1kpST5tcRum7u2o2PrteCc6xs=h310-rw',
                'https://lh3.googleusercontent.com/W2HgVhz0wdbMQMucRdYuRSysCfieg31cu2zJMcOpcAhuM7FlPintXB2xNaeg3TlAQpnb=h310-rw',
                'https://lh3.googleusercontent.com/0goT98D1SHLrAB3mZjeSsVm4_siFaFJQIuU7lDyD-nb2wOYlpG3dqfzGOZ-Pkv2R7OM=h310-rw',
                'https://lh3.googleusercontent.com/nvgp9sqe0Am_HQbEwuRzD5vtmia3RtZsrkTvODm9r2fvR3UZ37x0sj9caVSeT_rzoAY=h310-rw',
                'https://lh5.ggpht.com/0qV2BO3cU3WI-71EkVq35ClYRXVSGR5f3Fn4mK0wlFqzQSuNXvfBTD1GSP3mLqGEIg=h310-rw',
                'https://lh4.ggpht.com/fmlUNX_CPupAkczNeAZ5SLYE6xhDxDBOeNzgsrx70yqJokvcxMpDHyN1JQEUTociZ6w=h310-rw',
                'https://lh3.ggpht.com/lJ3ESBHQ09u6d3Q29QBMKIztwPhKMimmkAoqnKGAHnUP8Uwam-zfRaYG_a0Qg6wO9g=h310-rw' ]
        }

        global.paidTestApp = {
            isFree: false,
            price: 275
        }

        var appHtml = Fs.readFileSync('test/data/android_app_source.html').toString()
        var paidAppHtml = Fs.readFileSync('test/data/android_paid_app_source.html').toString()
        global.app = new GooglePlayParser().parseHtml(appHtml)
        global.paidapp = new GooglePlayParser().parseHtml(paidAppHtml)
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

    it("should parse paid pricing", function*() {
        paidapp.isFree.should.eql(paidTestApp.isFree)
        paidapp.price.should.eql(paidTestApp.price)
    })

    it("should parse content rating", function*() {
        app.contentRating.should.eql(testApp.contentRating)
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
