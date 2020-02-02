const express = require('express')
const router = express.Router()
const TicketModel = require('../models/ticket')


// index all tickets
router.get('/tickets', (req, res) => {
    TicketModel.find({})
    .then( tickets => {
        res.status(200).json({tickets: tickets})
    })
    .catch(error => console.log(error))
})


// show single ticket
router.get('/tickets/:id', (req, res) => {
    const ticketId = req.params.id
    TicketModel.findById(ticketId)
    .then( ticket => {
        res.status(200).json({ticket})
    })
    .catch(error => console.log(error))
})


// create ticket
router.post('/ticket/new', (req, res) => {
    const newTicket = req.body.ticket
    // console.log(newTicket)
    TicketModel.create(newTicket)
    .then( ticket => {
        res.status(201).json({ticket: ticket})
    } )
    .catch(error => console.log(error))
})


// update ticket
router.put('/tickets/:id', (req, res) => {
    const ticketId = req.params.id
    const ticketUpdates = req.body.ticket
    TicketModel.findById(ticketId)
    .then( ticket => {
       return ticket.update(ticketUpdates)
    })
    .then( () => res.sendStatus(204) )
    .catch(error => console.log(error))
})


// delete ticket
router.delete('/tickets/:id', (req, res) => {
    const ticketId = req.params.id
    TicketModel.findById(ticketId)
    .then( ticket => {
       return ticket.remove()
    })
    .then( () => res.sendStatus(204) )
    .catch(error => console.log(error))
})

module.exports = router