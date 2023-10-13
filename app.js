const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get("/", function (req, res) {
    res.render('template');
})

app.get("/about", function (req, res) {
    res.render('about');
})

app.get("/collections", function (req, res) {
    res.render('collections');
})

app.get("/detail/:", function (req, res) {
    res.render('about');
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})