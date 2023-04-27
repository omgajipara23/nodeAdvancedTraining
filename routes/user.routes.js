var { insert_address, insert_country, many_to_many, one_to_many, one_to_one, Polymorphic_one_to_many, hooks } = require('../controllers/user.controller')
var express = require('express')
var app = express()

app.post('/country', insert_country)
app.post('/address', insert_address)
app.post('/o_to_o', one_to_one)
app.post('/o_to_m', one_to_many)
app.post('/m_to_m', many_to_many)
app.post('/ply_o_to_m', Polymorphic_one_to_many)
app.post('/hooks', hooks)

module.exports = app