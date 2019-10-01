const express = require('express')
const app = express()

const SERVER_PORT = process.env.PORT || 3000


app.get('/' , (req,res)=> {
  res.send('checking fine!!')
})











app.listen(SERVER_PORT , (req,res)=> {
     console.log('server started at ' + SERVER_PORT)
})