const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const aboutData = require('./shared/json/about.json')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get("/", function (req, res) {
    res.render('pages/home');
})

app.get("/about", function (req, res) {
    const results = aboutData;
    const [about, meta] = results;

    // about.data.body.forEach(item => {
    //     console.log({ item });
    // })
    res.render('pages/about', {
        about,
        meta
    });
})

app.get("/collections", function (req, res) {
    res.render('pages/collections');
})

app.get("/detail/:uuid", function (req, res) {
    res.render('pages/detail');
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})