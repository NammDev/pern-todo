import { useState, useEffect } from 'react'
import axios from '../utils/axiosCustom'
import EditTodo from './EditTodo'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

function ListTodos() {
  const [todos, setTodos] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const fetchApi = async () => {
    const res = await axios.get('/todos')
    setTodos(res)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const deleteTodo = async (id) => {
    const res = await axios.delete(`/todos/${id}`)
    setTodos(todos.filter((todo) => todo.todo_id !== id))
  }

  const updateTodo = async (e) => {
    e.preventDefault()
    try {
      const body = { description }
      const response = await axios.put(`/todos/${todo.todo_id}`, JSON.stringify(body))
      window.location = '/'
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <>
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ListTodos
