const express = require('express')
const router = express.Router()

const TourModel = require('../models/tour')

// index all tickets
router.get('/tours', (req, res) => {
    TourModel.find({}) // fetching resource according to its owner
    .then( tours => {
        res.status(200).json({tours: tours})
    })
    .catch(error => console.log(error))
})

module.exports = router