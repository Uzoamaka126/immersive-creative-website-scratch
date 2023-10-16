require('dotenv').config();

const logger = require('morgan')
const express = require('express');
const errorhandler = require('errorhandler');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override')

const aboutData = require('./shared/json/about.json');
const productData = require('./shared/json/product.json');
const collectionsData = require('./shared/json/collections.json');
const homeData = require('./shared/json/home.json');
const preloader = require('./shared/json/preloader.json');
const navigationData = require('./shared/json/navigation.json');

function handleLinkResolver(doc) {
    if (doc === 'product') {
        return `/detail/${doc.slug}`
    }

    if (doc === 'collections') {
        return "/collections"
    }

    if (doc === 'about') {
        return "/about"
    }

    return "/"
}

app.use(function (req, res, next) {
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
    next()
})

app.use(logger('dev'));
app.use(methodOverride());
app.use(errorhandler());
app.use(express.static(path.join(__dirname, 'public')));

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