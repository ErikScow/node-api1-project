const express = require('express')
const shortid = require('shortid')


const server = express()
server.use(express.json())

let users = [
    {
        id: shortid.generate(),
        name: 'Erik Scow',
        bio: 'Web Developer'
    }
]

server.post('/api/users', (req, res) => {
    const newUser = req.body
    if (!newUser.name ||  !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        newUser.id = shortid.generate()
        users.push(newUser)
        res.status(201).json(newUser)
    }
    
})

server.get('/api/users', (req, res) => {
    res.json({users})
})

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    const found = users.find( user => user.id === id)
    if (found) {
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.'})
    }
}) 


server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    const found = users.find( user => user.id === id)
    if (found) {
        users = users.filter( user => user.id !== id)
        res.status(200).json(found)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.'})
    }
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const userToUpdate = users.findIndex( user => user.id === id)
    
    let updatedUser = req.body

    if ((userToUpdate !== -1) && updatedUser.name && updatedUser.bio) {
        users[userToUpdate] = updatedUser
        users[userToUpdate].id = shortid.generate()
        res.status(200).json(users[userToUpdate])
    } else if (!userToUpdate) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else if (!updatedUser.name || !updatedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
})

const PORT = 5000

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})