const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')
const path = require('path')
const PORT = process.env.PORT || 3000

// process.env.port

// Middleware
app.use(cors())
app.use(express.json())

app.use(express.static(path.join(__dirname, 'client/build')))
if (process.env.NODE_ENV === 'production') {
  // serve static content
}

// ROUTES
// Create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [
      description,
    ])
    res.json(newTodo.rows[0])
  } catch (error) {
    console.log(error)
  }
})

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo')
    res.json(allTodos.rows)
  } catch (error) {
    console.log(error)
  }
})

// Get todo
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id])
    res.json(todo.rows)
  } catch (error) {
    console.log(error)
  }
})

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { description } = req.body
    const { id } = req.params
    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [description, id])
    res.json(`Todo ${id} was updated!`)
  } catch (error) {
    console.log(error)
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id])
    res.json(`Todo ${id} was deleted!`)
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
