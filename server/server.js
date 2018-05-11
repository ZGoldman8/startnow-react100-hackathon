const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.static('public'));



app.get('/search/:q', (req, res) => {
    axios.get("https://www.googleapis.com/books/v1/volumes?q=" + req.params.q + "&key=AIzaSyAkjJwOM2zvkrjieILXF73TtAip84SWNkA")
        .then(function (response) {
            var data = response.data;
            // loop through data with map
            // add recommended books into dataItem
            // break out of loop
            // send modified data
            res.status(200).send(data);
        })
        .catch(function (error) {
            console.log(error);
        });
})

app.get('/recommended/:q', (req, res) => {
    axios.get("http://api.walmartlabs.com/v1/search?apiKey=few7cj458txgxnz7awx2cyen&query=" + req.params.q)
        .then(function (response) {
            var itemId = response.data.items[0].itemId;
            axios.get("http://api.walmartlabs.com/v1/nbp?apiKey=few7cj458txgxnz7awx2cyen&itemId=" + itemId)
                .then(function (response) {
                    var otherBooks = "";
                    for (var i = 0; i < 1; i++) {
                        response.data[i] ? (otherBooks += response.data[i].name + ", \n") : otherBooks = "No recommendations";
                    }
                    res.status(200).send(otherBooks);
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });
})
module.exports = app;
