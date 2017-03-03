const express = require('express')
const server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.json())

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test').then(function(a, b) {
    console.log('MongoDB: connected')
}, function(err) {
    console.log('MongoDB: connection error', err)
})

var formulaSchema = mongoose.Schema({
    title: String,
    parameters:[
        {
            variable: String,
            defaultValue: String,
            label: String,
        }
    ],
    formula: String,
})
var Formula = mongoose.model('Formula', formulaSchema)



server.post('/save', function(req, res) {
    formula = new Formula(req.body)
    formula.save().then(function(savedObj) {
        console.log("Save successful. ",savedObj.id)
        res.json({id: savedObj.id})
    })
})

server.listen(3000, function () {
    console.log('Server listening on port 3000')
})
