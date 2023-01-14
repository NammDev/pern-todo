const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const pool = require('./db')

// Middleware
app.use(cors())
app.use(express.json())

// ROUTES

// Create a todo

// Get all todo

// Update a todo

// delete a todo

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
