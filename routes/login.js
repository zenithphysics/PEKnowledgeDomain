const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Admin = require('../models/admin')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.post('/' , (req,res)=> {
    console.log(req.body)
       Admin.findOne({username:req.body.username},{password:req.body.password})
       .then(admin=> {
           res.status(200).json('logged in sucecssfully!!')
       })
       .catch(err=> {
           res.status(500).json(err)
       })
})

module.exports = router