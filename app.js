require('dotenv').config();

const logger = require('morgan')
const express = require('express');
const errorhandler = require('errorhandler');
const app = express();
const port = 3000;
const path = require('path');
const UAParser = require('ua-parser-js')

const methodOverride = require('method-override')

const aboutData = require('./shared/json/about.json');
const productData = require('./shared/json/product.json');
const collectionsData = require('./shared/json/collections.json');
const homeData = require('./shared/json/home.json');
const preloader = require('./shared/json/preloader.json');
const navigationData = require('./shared/json/navigation.json');

function handleLinkResolver(doc) {
    const lowercaseDoc = typeof doc === 'string' && doc.toLowerCase();

    console.log({ lowercaseDoc });
    if (lowercaseDoc === 'product') {
        return `/detail/${lowercaseDoc.slug}`
    }

    if (lowercaseDoc === 'collection' || lowercaseDoc === 'collections') {
        return "/collections"
    }

    if (lowercaseDoc === 'about') {
        return "/about"
    }

    return "/"
}

function handleJoinText(texts) {
    if (texts && Array.isArray(texts) && texts.length) {
        return texts.join(" ")
    }
}

app.use(logger('dev'));
app.use(methodOverride());
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    const ua = UAParser(req.headers['user-agent'])
    res.locals.Link = handleLinkResolver;

    res.locals.Numbers = function(index) {
        switch (index) {
            case 0:
                return "One"
            case 1:
                    return "Two"
            case 2:
                return "Three"
            case 3:
                return "Four"        
            default:
                return ""
        }
    }

    res.locals.TextJoin = handleJoinText;

    next()
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", function (req, res) {
    const { meta, ...data } = homeData;
    const { results } = collectionsData;
    const navigation = navigationData;

    res.render('pages/home', {
        data,
        preloader,
        meta,
        collections: results,
        navigation
    });
})

app.get("/about", function (req, res) {
    const results = aboutData;
    const [about, meta] = results;
    const navigation = navigationData;

    res.render('pages/about', {
        about,
        meta,
        preloader,
        navigation
    });
})

app.get("/collections", function (req, res) {
    const { results, meta } = collectionsData;
    const navigation = navigationData;

    res.render('pages/collections', {
        collections: results,
        meta,
        home: homeData,
        preloader,
        navigation
    });
})

app.get("/detail/:uuid", function (req, res) {
    const [data, meta] = productData;
    const navigation = navigationData;

    let product = {};

    data.data.forEach((item) => {
        if (item && item.uuid === req.params.uuid) {
            product = {...item}
        }
    })
  
    res.render('pages/detail', {
        product,
        meta,
        preloader,
        navigation
    });
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})