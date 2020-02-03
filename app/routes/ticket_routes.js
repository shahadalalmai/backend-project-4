const express = require('express')
const router = express.Router()
const TicketModel = require('../models/ticket')

// import passport
const passport = require('passport') // similar to the concept of jwt
// Use authentication
const requireToken = passport.authenticate('bearer', {session:false})
//we use already made error handling by the template
const customError = require('../../lib/custom_errors')
const handle404 = customError.handle404
const requireOwnership = customError.requireOwnership // to display specific item that belongs to a specific person

// index all tickets
router.get('/tickets', requireToken, (req, res, next) => {
    const userId = req.user._id
    TicketModel.find({"owner": userId}) // fetching resource according to its owner
    .then( tickets => {
        res.status(200).json({tickets: tickets})
    })
    .catch(next)
})


// show single ticket
router.get('/tickets/:id', requireToken, (req, res, next) => {
    const ticketId = req.params.id
    TicketModel.findById(ticketId)
    .then( ticket => {
        requireOwnership(req, ticket)
        res.status(200).json({ticket})
    })
    .catch(next) //goes to next middleqare in server.js
})


// create ticket
router.post('/ticket/new', requireToken, (req, res, next) => {
    const userId = req.user._id
    const newTicket = req.body.ticket
    newTicket.owner = userId// specifying the owner of the ticket
    // console.log(newTicket)
    TicketModel.create(newTicket)
    .then( ticket => {
        res.status(201).json({ticket: ticket})
    } )
    .catch(next)
})


// update ticket
router.put('/tickets/:id', requireToken, (req, res, next) => {
    const ticketId = req.params.id
    const ticketUpdates = req.body.ticket
    TicketModel.findById(ticketId)
    .then( ticket => {
        requireOwnership(req, ticket) // verify the owner of the ticket resource before update action
        return ticket.update(ticketUpdates)
    })
    .then( () => res.sendStatus(204) )
    .catch(next)
})


// delete ticket
router.delete('/tickets/:id', requireToken, (req, res, next) => {
    const ticketId = req.params.id
    TicketModel.findById(ticketId)
    .then( ticket => {
        requireOwnership(req, ticket) // verify the owner of the ticket resource before destroy action
        return ticket.remove()
    })
    .then( () => res.sendStatus(204) )
    .catch(next)
})

module.exports = router