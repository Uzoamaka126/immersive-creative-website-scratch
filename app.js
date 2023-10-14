const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const aboutData = require('./shared/json/about.json');
const productData = require('./shared/json/product.json');
const find = require('lodash/find')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get("/", function (req, res) {
    res.render('pages/home');
})

app.get("/about", function (req, res) {
    const results = aboutData;
    const [about, meta] = results;

    res.render('pages/about', {
        about,
        meta
    });
})

app.get("/collections", function (req, res) {
    res.render('pages/collections');
})

app.get("/detail/:uuid", function (req, res) {
    // console.log(req.params.uuid);
    const [data, meta] = productData;

    let product = {};

    data.data.forEach((item) => {
        if (item && item.uuid === req.params.uuid) {
            // console.log({ item });
            product = {...item}
        }
    })
  
    res.render('pages/detail', {
        product,
        meta
    });
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})