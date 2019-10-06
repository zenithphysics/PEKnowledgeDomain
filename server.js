const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const adminRoutes = require('./routes/admin')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()

const SERVER_PORT = process.env.PORT || 3000


app.engine('handlebars' , exphbs({
    defaultLayout:'main'
}))

app.set('view engine' ,'handlebars')

app.use(express.static(path.join(__dirname , 'public')))



mongoose.connect(keys.mongodb.dbURI,{useUnifiedTopology: true,useNewUrlParser: true}).then(()=>console.log('connected to mongodb'))
.catch((err)=> {
 console.log(err)
})

app.get('/' , (req,res)=> {
   res.render('Subject/addsubject')
})


app.use('/admin' , adminRoutes)



app.listen(SERVER_PORT , (req,res)=> {
     console.log('server started at ' + SERVER_PORT)
})