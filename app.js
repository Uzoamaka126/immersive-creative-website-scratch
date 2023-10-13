const express = require('express');
const app = express();
const port = 3000;

app.get("/", function (req, res) {
    res.send("<strong>Hello world!</strong>")
})

app.listen(port, function() {
    console.log(`Example app listening at http://localhost:${port}`);
})