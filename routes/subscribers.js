const express = require('express')
const { MongoMissingCredentialsError } = require('mongodb')
const subscriber = require('../models/subscriber')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//getting all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})

//getting one
router.get('/:id', GetSubscriber, (req, res) => {
    res.send(res.subscriber.name)
})

//creating one
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})

//updating one
router.patch('/:id', GetSubscriber, async (req, res) => {
    try {
        res.subscriber.name = req.body.name
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//delete one
router.delete('/:id', GetSubscriber, async (req, res) => {
    try {
        await res.subscriber.delete()
        res.status(200).json({ message: 'Subscriber is deleted' })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

async function GetSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber === null) {
            return res.status(404).json({ message: 'No subscriber found' })
        }

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.subscriber = subscriber
    next()
}


module.exports = router