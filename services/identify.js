const express = require('express');
const identifyOperation = require('../database/databaseOperations');
const createResponse = require('../utilities/createResponse');
const router = express.Router();

router.post('/identify',(req,res)=>{
    identifyOperation(req.body).then((result)=>{
        res.send(JSON.stringify(createResponse(result)))
    }).catch((data)=>{
        console.log("following error occured",data)
    })
    
})

module.exports = router