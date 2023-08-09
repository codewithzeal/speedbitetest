const express = require('express');
const identifyOperation = require('../database/databaseOperations');
const identityHandler = require('../handlers/indentifyHandler');
const router = express.Router();

router.post('/identify',(req,res)=>{
    identityHandler(req.body).then((response)=>{
        res.send(JSON.stringify(response))
    }).catch(()=>{

    })
})

module.exports = router