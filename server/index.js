const express = require('express')
const server = express()

const bodyParser = require('body-parser');
server.use(bodyParser.json());

server.post('/echo', function(req, res) {
    console.log(req.body)
    res.json({echo: req.body})
})

server.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
