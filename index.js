const express = require('express')
const shortid = require('shortid')

const server = express()

const users = [
    {
        id: shortid.generate(),
        name: 'Erik Scow',
        bio: 'Web Developer'
    }
]

server.get('/', (req, res) => {
    res.json({users})
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})