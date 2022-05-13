const express = require('express')
const router = express.Router()
const pool=require("../connection");

// getRoot
router.get('/', (req, res) => {
    res.send('Server Runs!')
})

router.get('/con', (req, res) => {
    // res.send(pool)
})

module.exports = router;