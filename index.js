var express = require('express')
var app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const users = require('./routes/user.routes')
app.use(users)

app.listen(5000, ()=>{
    console.log("App Is Listen Successfully!!!!");
})