const express = require('express');
const identifyOperation = require('../database/databaseOperations');
const identityHandler = require('../handlers/indentifyHandler');
const validateRequest = require('../utilities/validateRequest');
const router = express.Router();

router.post('/identify',validateRequest,(req,res)=>{
    identityHandler(req.body).then((response)=>{
        res.send(JSON.stringify(response))
    }).catch(()=>{
        return res.status(400).json({ error: 'please check values provided' });
    })
})

module.exports = router