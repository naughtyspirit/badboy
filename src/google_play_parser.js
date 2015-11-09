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
    var $website = $('.dev-link:contains("Visit Website")')
    var devWebsite = null

    if($website.length > 0) {
        var website = $website[0].attribs.href;
        var devWebsite = getUrlVars(website)['q']
    }

    var $physicalAddress = $('div.physical-address')
    var physicalAddress = ""
    if($physicalAddress.length > 0) {
        physicalAddress = $physicalAddress.text().trim()
    }

    var developer = {
        name: $('.document-subtitle.primary span').html(),
        isTopDeveloper: $('meta[itemprop="topDeveloperBadgeUrl"]').length > 0 ? true : false,
        website: devWebsite,
        physicalAddress: physicalAddress,
        platform: "Android",
        devUrl: $('div[itemprop="author"] a.document-subtitle.primary')[0].attribs.href.replace('https://play.google.com',''),

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

    var price = 0
    var isFree = $('.price.buy.id-track-click span').text().trim().indexOf("Install") > -1;
    if(isFree === false) {
        price = getNumber($('meta[itemprop="price"]').attr('content'));
    }

    return {
        name: $('div .document-title').text().trim(),
        categories : [$('.category').text().trim()],
        icon : $('.cover-image').attr('src'),
        isFree: isFree,
        package: $('.details-wrapper.apps').attr('data-docid'),
        publicationDate: $('div[itemprop="datePublished"]').text().trim(),
        description : $('.id-app-orig-desc').html(),
        installs: $('div[itemprop="numDownloads"]').text().replace(/\s+/g, ''),
        contentRating: $('div[itemprop="contentRating"]').text().trim(),
        price: price,
        score: {
            oneStars:  getNumber($('div.rating-bar-container.one span.bar-number').text().trim()),
            twoStars:  getNumber($('div.rating-bar-container.two span.bar-number').text().trim()),
            threeStars:  getNumber($('div.rating-bar-container.three span.bar-number').text().trim()),
            fourStars:  getNumber($('div.rating-bar-container.four span.bar-number').text().trim()),
            fiveStars: getNumber($('div.rating-bar-container.five span.bar-number').text().trim()),
            count: getNumber($('span.reviews-num').text().trim()),
            total: Number($('div.score').text().trim())
        },
        screenshots: imgs,
        developer: developer 
    }
}

function getUrlVars(url)
{
    var vars = [], hash;
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getNumber(text) {
    var number = 0;
    try {
        number = Number(text.replace(/[^0-9]+/g,""));
    } catch (e) {
        number =0;
    }

    return number;
}
module.exports = GooglePlayParser

