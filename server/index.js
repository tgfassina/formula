const express = require('express')
const server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.json())

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test').then(function() {
    console.log('MongoDB: connected')
}, function(error) {
    console.log('MongoDB: connection error', error)
})

var formulaSchema = mongoose.Schema({
    data: {
        title: String,
        parameters:[
            {
                variable: String,
                defaultValue: String,
                label: String,
            },
        ],
        formula: String,
    },
})
var Formula = mongoose.model('Formula', formulaSchema)



server.post('/save', function(req, res) {
    formula = new Formula(req.body)
    formula.save().then(function(savedObj) {
        console.log('Save successful: ',savedObj.id)
        res.json({id: savedObj.id})
    })
})

server.get('/load/:id', function(req, res) {
    Formula.findById(req.params.id).then(function(data) {
        console.log('Found formula: '+req.params.id)
        res.json({data: data.data})
    }, function() {
        console.log('Formula not found: '+req.params.id)
    })
})

server.listen(3000, function () {
    console.log('Server listening on port 3000')
})
