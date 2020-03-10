const express = require('express');
const router = express.Router();
const businessLogic = require("./business-logic");

router.get('/getGrower', function (req, res) {
    res.send("getGrower");
})


router.get('/', function (req, res) {
    res.send('Home Page')
})

router.get('/getGrower/:growerName', function (req, res) {
    res.send('Home')
})

router.post('/addGrower', (req, res) => {
    res.send('Grower added successfully')
})

router.post('/addBuyer', (req, res) => {
    res.send('Buyer added successfully')
})

router.get('/transactions/:id', (req,res) =>{

    let growerId = req.params.id;

    businessLogic.getTransactions(growerId).then(result => {
        res.send(result)
    }).catch(error => {
        logger.error(error);
        res.sendStatus(500);
    })
})

module.exports = {
    router
}
